import os
import django
from ads_text_generator.open_ai_handler import get_vacancy_creation_with_taxonomy_prompt, generate_ai_answer
from bs4 import BeautifulSoup

if __name__ == '__main__':
    os.environ["DJANGO_SETTINGS_MODULE"] = 'config.settings'
    django.setup()
    from buxonline.models import FirstLevelTaxonomy, Language, Vacancy


def create_vacancies(qnt_limit: int):
    main_language = Language.objects.filter(name='English').first()
    categories = FirstLevelTaxonomy.objects.all()
    for count, tax in enumerate(categories):
        if tax.vacancy_set.count() >= qnt_limit:
            print(f'! vacancy creation for [{tax}] passed!')
            continue
        taxonomies = tax.secondleveltaxonomy_set.all().order_by('?')[:7]
        taxonomies_prompt = [t.get_category_items_prompt() for t in taxonomies]
        prompt = get_vacancy_creation_with_taxonomy_prompt(taxonomy1=tax.role, taxonomies2=str(taxonomies_prompt))
        ai_vacancy_text_html = generate_ai_answer(prompt, '',
                                                  expected_data_type='html', print_raw_answer=False)
        soup = BeautifulSoup(ai_vacancy_text_html, 'lxml')
        ai_vacancy_text = soup.text
        Vacancy.objects.create(
            language=main_language,
            taxonomy=tax,
            title=tax.role,
            text=ai_vacancy_text,
            text_html=ai_vacancy_text_html,
        )
        print(f'> {count+1}/{len(categories)} done > [{tax}]')


if __name__ == '__main__':
    create_vacancies(qnt_limit=10)
    print('Done!')

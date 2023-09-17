from celery import shared_task
from buxonline.fixtures.open_ai_handler import generate_vacancy_seo_data
from buxonline.fixtures.google_ads_api.create_kw_ideas import generate_google_keyword_ideas
from buxonline.fixtures.google_ads_api.create_ads import generate_google_ads
from buxonline.models import Vacancy, Language
from config.settings import AZURE_OPENAI_API_KEY


@shared_task
def generate_vacancy_seo_data_for_lang(language_name: str, start_from_vacancy_pk: int = None) -> [list, str]:
    try:
        if not start_from_vacancy_pk:
            vacancies = Vacancy.objects.filter(language__name=language_name).order_by('pk')
        else:
            vacancies = Vacancy.objects.filter(
                id__gte=start_from_vacancy_pk, language__name=language_name
            ).order_by('pk')
        result = generate_vacancy_seo_data(open_ai_api_key=AZURE_OPENAI_API_KEY, vacancies=vacancies)
        return result
    except Exception as ex:
        msg = f'> generate_vacancy_seo_data task Exception: {ex}'
        print(msg)
        return msg


@shared_task
def generate_vacancy_google_keyword_ideas(language_name: str, start_from_vacancy_pk: int = None) -> [list, str]:
    try:
        lang = Language.objects.filter(name=language_name).first()
        if not start_from_vacancy_pk:
            vacancies = Vacancy.objects.filter(language=lang).order_by('pk')
        else:
            vacancies = Vacancy.objects.filter(id__gte=start_from_vacancy_pk, language=lang).order_by('pk')
        from pathlib import Path
        print(Path.cwd())
        print(Path(__file__).resolve())
        result = generate_google_keyword_ideas(language=lang, vacancies=vacancies)
        return result
    except Exception as ex:
        msg = f'> generate_vacancy_seo_data task Exception: {ex}'
        print(msg)
        return msg


@shared_task
def generate_vacancy_google_ads(
        main_campaign_id: str, language_name: str, start_from_vacancy_pk: int = None
) -> [list, str]:
    try:
        lang = Language.objects.filter(name=language_name).first()
        if not start_from_vacancy_pk:
            vacancies = Vacancy.objects.filter(language=lang).order_by('pk')
        else:
            vacancies = Vacancy.objects.filter(id__gte=start_from_vacancy_pk, language=lang).order_by('pk')
        result = generate_google_ads(main_campaign_id=main_campaign_id, vacancies=vacancies)
        return result
    except Exception as ex:
        msg = f'> generate_vacancy_seo_data task Exception: {ex}'
        print(msg)
        return msg

from celery import shared_task
from buxonline.fixtures.open_ai_handler import generate_vacancy_seo_data
from buxonline.models import Vacancy
from config.settings import AZURE_OPENAI_API_KEY, AZURE_TRANSLATE_API_KEY


@shared_task
def generate_vacancy_seo_data(language_name: str, start_from_vacancy_pk: int = None) -> [list, str]:
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

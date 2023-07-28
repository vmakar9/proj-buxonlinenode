import deepl
import os
import django
from time import sleep

if __name__ == '__main__':
    os.environ["DJANGO_SETTINGS_MODULE"] = 'config.settings'
    django.setup()
    from buxonline.models import Language, Vacancy

auth_key = ''
translator = deepl.Translator(auth_key)

lang = Language.objects.filter(code_a2='uk').first()
try:
    vacancies = Vacancy.objects.filter(parent__isnull=True).order_by('pk')
    for count, v in enumerate(vacancies):
        if count > 191:
            title_translated = translator.translate_text(v.title, target_lang=lang.code_a2.upper())
            sleep(0.5)
            text_translated = translator.translate_text(v.text, target_lang=lang.code_a2.upper())
            translated_v = Vacancy.objects.create(
                language=lang,
                taxonomy=v.taxonomy,
                title=title_translated,
                text=text_translated,
                parent=v,
            )
            sleep(0.5)
            print(f'> {count+1}/{len(vacancies)} done! ({translated_v}).')
except deepl.exceptions.DeepLException as deepl_ex:
    print('> deepl_error:', deepl_ex)
except Exception as ex:
    print('> error:', ex)

import os
from ads_text_generator.target_langs import eastern_european_countries, eastern_european_langs


if __name__ == '__main__':
    import django
    os.environ["DJANGO_SETTINGS_MODULE"] = 'config.settings'
    django.setup()
    from buxonline.models import Country, Language

    for country in eastern_european_countries:
        Country.objects.create(name=country['name'], code_a2=country['code'])

    for name, langs in eastern_european_langs.items():
        print(name, langs)
        country_obj = Country.objects.get(name=name)
        langs_obj = []
        for lang in langs:
            obj = Language.objects.get(name=lang)
            langs_obj.append(obj)
        for lang in langs_obj:
            country_obj.languages.add(lang)
        country_obj.save()






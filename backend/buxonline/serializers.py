from rest_framework import serializers
from buxonline.models import Vacancy, FirstLevelTaxonomy, Language, VacancyMetaTranslated


class VacancyMetaTranslatedSerializer(serializers.ModelSerializer):
    class Meta:
        model = VacancyMetaTranslated
        fields = ('more', 'apply_for_job')


class VacancySerializer(serializers.ModelSerializer):
    meta = VacancyMetaTranslatedSerializer()

    class Meta:
        model = Vacancy
        exclude = ('text_html', 'parent')


class FirstLevelTaxonomySerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstLevelTaxonomy
        fields = '__all__'


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = '__all__'

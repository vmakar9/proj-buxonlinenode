from rest_framework import serializers
from buxonline.models import (
    Vacancy, FirstLevelTaxonomy, Language, VacancyMetaTranslated, LanguageMeta, Landing, LandingStep,
)


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


class FirstLevelTaxonomyExtendedSerializer(serializers.ModelSerializer):
    vacancies_count = serializers.SerializerMethodField()

    def get_vacancies_count(self, instance) -> int:
        return instance.vacancy_set.count()

    class Meta:
        model = FirstLevelTaxonomy
        fields = '__all__'


class LanguageMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageMeta
        exclude = ('id', 'language')


class LanguageSerializer(serializers.ModelSerializer):
    page_meta = LanguageMetaSerializer(source='languagemeta')

    class Meta:
        model = Language
        fields = '__all__'


class LandingStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingStep
        exclude = ('id', 'landing')


class LandingSerializer(serializers.ModelSerializer):
    steps = LandingStepSerializer(many=True, read_only=True)

    class Meta:
        model = Landing
        fields = '__all__'

from django.contrib import admin
from buxonline.models import (
    FirstLevelTaxonomy, SecondLevelTaxonomy, TechnologyItem, Country, Language, Vacancy, VacancyMetaTranslated,
    LanguageMeta, Landing, LandingStep, LandingFeedback, VacancyRawKeyWord, VacancyGoogleKeyWord, VacancyHeader,
    VacancyDescription,
)


class VacancyRawKeyWordInline(admin.StackedInline):
    model = VacancyRawKeyWord
    extra = 0
    max_num = 15


class VacancyGoogleKeyWordInline(admin.StackedInline):
    model = VacancyGoogleKeyWord
    extra = 0
    max_num = 50


class VacancyHeaderInline(admin.StackedInline):
    model = VacancyHeader
    extra = 0
    max_num = 15


class VacancyDescriptionInline(admin.StackedInline):
    model = VacancyDescription
    extra = 0
    max_num = 4


class VacancyAdmin(admin.ModelAdmin):
    inlines = (VacancyRawKeyWordInline, VacancyGoogleKeyWordInline, VacancyHeaderInline, VacancyDescriptionInline)
    list_filter = ('language', 'taxonomy',)
    list_display = ('title', 'language', 'taxonomy', )
    search_fields = ('title', 'text', )
    readonly_fields = ('url', )


class LandingStepInline(admin.StackedInline):
    model = LandingStep
    extra = 8
    max_num = 8
    can_delete = False


class LandingFeedbackInline(admin.StackedInline):
    model = LandingFeedback
    extra = 3
    max_num = 10


class LandingAdmin(admin.ModelAdmin):
    inlines = (LandingStepInline, LandingFeedbackInline)


admin.site.register(FirstLevelTaxonomy)
admin.site.register(SecondLevelTaxonomy)
admin.site.register(TechnologyItem)
admin.site.register(Country)
admin.site.register(Language)
admin.site.register(VacancyMetaTranslated)
admin.site.register(Vacancy, VacancyAdmin)
admin.site.register(LanguageMeta)
admin.site.register(Landing, LandingAdmin)
admin.site.register(LandingStep)
admin.site.register(LandingFeedback)

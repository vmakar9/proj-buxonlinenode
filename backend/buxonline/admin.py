from django.contrib import admin
from buxonline.models import (
    FirstLevelTaxonomy, SecondLevelTaxonomy, TechnologyItem, Country, Language, Vacancy, VacancyMetaTranslated,
    LanguageMeta, Landing, LandingStep
)


class VacancyAdmin(admin.ModelAdmin):
    list_filter = ('language', 'taxonomy',)
    list_display = ('title', 'language', 'taxonomy', )
    search_fields = ('title', 'text', )
    readonly_fields = ('url', )


class LandingStepInline(admin.StackedInline):
    model = LandingStep
    extra = 8
    max_num = 8
    can_delete = False


class LandingAdmin(admin.ModelAdmin):
    inlines = (LandingStepInline, )


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

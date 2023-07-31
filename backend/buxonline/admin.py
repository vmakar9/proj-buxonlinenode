from django.contrib import admin
from buxonline.models import (
    FirstLevelTaxonomy, SecondLevelTaxonomy, TechnologyItem, Country, Language, Vacancy, VacancyMetaTranslated
)


class VacancyAdmin(admin.ModelAdmin):
    list_filter = ('language', 'taxonomy',)
    list_display = ('title', 'language', 'taxonomy', )
    search_fields = ('title', 'text', )
    readonly_fields = ('url', )


admin.site.register(FirstLevelTaxonomy)
admin.site.register(SecondLevelTaxonomy)
admin.site.register(TechnologyItem)
admin.site.register(Country)
admin.site.register(Language)
admin.site.register(VacancyMetaTranslated)
admin.site.register(Vacancy, VacancyAdmin)

from django.contrib import admin
from buxonline.models import FirstLevelTaxonomy, SecondLevelTaxonomy, TechnologyItem, Country, Language


admin.site.register(FirstLevelTaxonomy)
admin.site.register(SecondLevelTaxonomy)
admin.site.register(TechnologyItem)
admin.site.register(Country)
admin.site.register(Language)

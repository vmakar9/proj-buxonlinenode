from django.contrib import admin
from buxonline.models import FirstLevelTaxonomy, SecondLevelTaxonomy, TechnologyItem


admin.site.register(FirstLevelTaxonomy)
admin.site.register(SecondLevelTaxonomy)
admin.site.register(TechnologyItem)

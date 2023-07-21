from django.urls import path
from buxonline.views import VacancyListApiView, FirstLevelTaxonomyListApiView, LanguageListApiView

urlpatterns = [
    path('vacancy/list/', VacancyListApiView.as_view(), name='vacancy_list'),
    path('category/list/', FirstLevelTaxonomyListApiView.as_view(), name='vacancy_list'),
    path('language/list/', LanguageListApiView.as_view(), name='vacancy_list'),
]

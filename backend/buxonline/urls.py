from django.urls import path
from buxonline.views import (VacancyListApiView, FirstLevelTaxonomyListApiView, LanguageListApiView,
                             VacancyRetrieveAPIView, FirstLevelTaxonomyRetrieveAPIView, LanguageRetrieveAPIView)

urlpatterns = [
    path('vacancy/list/', VacancyListApiView.as_view(), name='vacancy_list'),
    path('category/list/', FirstLevelTaxonomyListApiView.as_view(), name='category_list'),
    path('language/list/', LanguageListApiView.as_view(), name='language_list'),
    path('vacancy/<int:pk>/', VacancyRetrieveAPIView.as_view(), name='vacancy'),
    path('category/<int:pk>/', FirstLevelTaxonomyRetrieveAPIView.as_view(), name='category'),
    path('language/<int:pk>/', LanguageRetrieveAPIView.as_view(), name='language'),
]

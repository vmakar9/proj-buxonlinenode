from django.shortcuts import get_object_or_404
from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from buxonline.serializers import (
    VacancySerializer, FirstLevelTaxonomySerializer, LanguageSerializer, FirstLevelTaxonomyExtendedSerializer
)
from buxonline.models import Vacancy, FirstLevelTaxonomy, Language
# from drf_spectacular.utils import extend_schema, OpenApiParameter, extend_schema_view
# from drf_spectacular.types import OpenApiTypes


class DefaultPagination(PageNumberPagination):
    page_size_query_param = 'per_page'
    page_size = 10


class VacancyListApiView(ListAPIView):
    serializer_class = VacancySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Vacancy.objects.select_related('meta').order_by('pk').order_by('taxonomy')
    pagination_class = DefaultPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        lang = self.request.query_params.get('lang')
        category = self.request.query_params.get('category')
        if lang:
            queryset = queryset.filter(language__code_a2=lang)
        if category:
            try:
                category_id = int(category)
            except ValueError:
                raise ParseError(detail='Invalid category value. It must be an integer.')
            queryset = queryset.filter(taxonomy_id=category_id)
        return queryset


class FirstLevelTaxonomyListApiView(ListAPIView):
    serializer_class = FirstLevelTaxonomySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = FirstLevelTaxonomy.objects.all().order_by('pk')
    pagination_class = None


class LanguageListApiView(ListAPIView):
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Language.objects.all().order_by('pk')
    pagination_class = None


class VacancyRetrieveAPIView(RetrieveAPIView):
    serializer_class = VacancySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Vacancy.objects.all()
    lookup_field = 'pk'

    def get_object(self):
        to_lang = self.request.query_params.get('to_lang', None)
        obj = super().get_object()
        if to_lang:
            try:
                switch_lang = get_object_or_404(Language, code_a2=to_lang)
            except Language.DoesNotExist:
                raise ParseError(detail='Incorrect lang code or not found.')
            if switch_lang.code_a2 == 'en' and obj.parent:
                translated_obj = obj.parent
            elif switch_lang.code_a2 == 'en' and not obj.parent:
                return obj
            elif obj.parent:
                translated_obj = obj.parent.children.filter(language=switch_lang).first()
            else:
                translated_obj = obj.children.filter(language=switch_lang).first()
            return translated_obj
        return obj


class FirstLevelTaxonomyRetrieveAPIView(RetrieveAPIView):
    serializer_class = FirstLevelTaxonomyExtendedSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = FirstLevelTaxonomy.objects.all()
    lookup_field = 'pk'


class LanguageRetrieveAPIView(RetrieveAPIView):
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Language.objects.all()
    lookup_field = 'pk'

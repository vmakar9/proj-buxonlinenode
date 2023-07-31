from rest_framework.exceptions import ParseError
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from buxonline.serializers import VacancySerializer, FirstLevelTaxonomySerializer, LanguageSerializer
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
    pagination_class = DefaultPagination


class VacancyRetrieveAPIView(RetrieveAPIView):
    serializer_class = VacancySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Vacancy.objects.all()
    lookup_field = 'pk'


class FirstLevelTaxonomyRetrieveAPIView(RetrieveAPIView):
    serializer_class = FirstLevelTaxonomySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = FirstLevelTaxonomy.objects.all()
    lookup_field = 'pk'


class LanguageRetrieveAPIView(RetrieveAPIView):
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Language.objects.all()
    lookup_field = 'pk'

from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.pagination import PageNumberPagination
from buxonline.serializers import VacancySerializer, FirstLevelTaxonomySerializer, LanguageSerializer
from buxonline.models import Vacancy, FirstLevelTaxonomy, Language


class DefaultPagination(PageNumberPagination):
    page_size_query_param = 'per_page'
    page_size = 10


class VacancyListApiView(ListAPIView):
    serializer_class = VacancySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = Vacancy.objects.all().order_by('pk')
    pagination_class = DefaultPagination


class FirstLevelTaxonomyListApiView(ListAPIView):
    serializer_class = FirstLevelTaxonomySerializer
    permission_classes = [IsAuthenticatedOrReadOnly, ]
    queryset = FirstLevelTaxonomy.objects.all().order_by('pk')
    pagination_class = DefaultPagination


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

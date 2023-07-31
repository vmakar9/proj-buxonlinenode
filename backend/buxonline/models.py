from django.db import models
from django.utils.text import slugify
from uuid import uuid4


class FirstLevelTaxonomy(models.Model):
    role = models.CharField(max_length=200)
    synonym = models.CharField(max_length=300, blank=True)

    class Meta:
        verbose_name = '1st lvl Taxonomy'
        verbose_name_plural = '1st lvl Taxonomies'

    def __str__(self):
        return self.role


class SecondLevelTaxonomy(models.Model):
    taxonomy = models.ForeignKey(FirstLevelTaxonomy, on_delete=models.CASCADE)
    category = models.CharField(max_length=200)
    items = models.ManyToManyField('TechnologyItem', blank=True)

    class Meta:
        verbose_name = '2nd lvl Taxonomy'
        verbose_name_plural = '2nd lvl Taxonomies'

    def __str__(self):
        return f'{self.taxonomy.role} >>> {self.category}'

    def get_category_items_prompt(self):
        return {'category': self.category, 'items': [i.name for i in self.items.all()]}


class TechnologyItem(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Technology Item'
        verbose_name_plural = 'Technology Items'

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=200, unique=True)
    code_a2 = models.CharField(max_length=2, unique=True)
    languages = models.ManyToManyField('Language', blank=True)

    def __str__(self):
        return f'[{self.code_a2}] {self.name}'

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'


class Language(models.Model):
    name = models.CharField(max_length=200, unique=True)
    code_a2 = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Language'
        verbose_name_plural = 'Languages'


class Vacancy(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    taxonomy = models.ForeignKey(FirstLevelTaxonomy, on_delete=models.CASCADE)
    url = models.SlugField(max_length=310, blank=True, unique=True, editable=False)
    title = models.CharField(max_length=300)
    text = models.TextField()
    text_html = models.TextField(blank=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='children')

    class Meta:
        verbose_name = 'Vacancy'
        verbose_name_plural = 'Vacancies'

    def __str__(self):
        return f'{self.title} [{self.url}]'

    def save(self, *args, **kwargs):
        if not self.url:
            self.url = f"{slugify(self.taxonomy.role)}-{str(uuid4())[:6]}"
        super(Vacancy, self).save(*args, **kwargs)


class SEOPage(models.Model):
    pass


class KeyWord(models.Model):
    pass



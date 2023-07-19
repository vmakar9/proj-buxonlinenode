from django.db import models


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


class TechnologyItem(models.Model):
    name = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Technology Item'
        verbose_name_plural = 'Technology Items'

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=200, unique=True)
    code_a2 = models.CharField(max_length=2)
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
    pass


class SEOPage(models.Model):
    pass


class KeyWord(models.Model):
    pass


class EEULang(models.Model):
    pass


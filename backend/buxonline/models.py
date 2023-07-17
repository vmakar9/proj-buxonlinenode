from django.db import models


class FirstLevelTaxonomy(models.Model):
    role = models.CharField(max_length=200)

    class Meta:
        verbose_name = '1st lvl Taxonomy'
        verbose_name_plural = '1st lvl Taxonomies'

    def __str__(self):
        return self.role


class SecondLevelTaxonomy(models.Model):
    taxonomy = models.ForeignKey(FirstLevelTaxonomy, on_delete=models.CASCADE)
    category = models.CharField(max_length=200)
    items = models.ManyToManyField('TechnologyItem')

    class Meta:
        verbose_name = '2nd lvl Taxonomy'
        verbose_name_plural = '2nd lvl Taxonomies'

    def __str__(self):
        return self.category


class TechnologyItem(models.Model):
    name = models.CharField(max_length=200)


class Vacancy(models.Model):
    pass


class SEOPage(models.Model):
    pass


class KeyWord(models.Model):
    pass


class EEULang(models.Model):
    pass


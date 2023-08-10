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


class LanguageMeta(models.Model):
    language = models.OneToOneField(Language, on_delete=models.CASCADE)
    menu_vacancies = models.CharField(max_length=512, blank=True)
    menu_for_business = models.CharField(max_length=512, blank=True)
    menu_send_cv = models.CharField(max_length=512, blank=True)
    menu_categories = models.CharField(max_length=512, blank=True)
    footer_bot = models.CharField(max_length=512, blank=True)
    footer_privacy = models.CharField(max_length=512, blank=True)
    footer_cookie = models.CharField(max_length=512, blank=True)
    footer_rights = models.CharField(max_length=512, blank=True)
    err_title = models.CharField(max_length=512, blank=True)
    err_subtitle = models.CharField(max_length=512, blank=True)
    err_text = models.CharField(max_length=512, blank=True)
    err_link = models.CharField(max_length=512, blank=True)

    def __str__(self):
        return self.language.__str__()

    class Meta:
        verbose_name = 'Language Meta'
        verbose_name_plural = 'Languages Meta'


class VacancyMetaTranslated(models.Model):
    language = models.OneToOneField(Language, on_delete=models.CASCADE)
    more = models.CharField(max_length=512, blank=True)
    apply_for_job = models.CharField(max_length=512, blank=True)

    def __str__(self):
        return f'{self.language} -> {self.more}'

    class Meta:
        verbose_name = 'Vacancy Meta'
        verbose_name_plural = 'Vacancies Meta'


class Vacancy(models.Model):
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    taxonomy = models.ForeignKey(FirstLevelTaxonomy, on_delete=models.CASCADE)
    meta = models.ForeignKey(VacancyMetaTranslated, on_delete=models.SET_NULL, blank=True, null=True)
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
            self.url = f"{slugify(self.taxonomy.role)}-{str(uuid4())[:8]}"
        super(Vacancy, self).save(*args, **kwargs)


class Landing(models.Model):
    language = models.OneToOneField(Language, on_delete=models.CASCADE)
    btn_text = models.CharField(max_length=1024, default='Send CV')
    hero_title = models.CharField(max_length=1024)
    hero_desc = models.CharField(max_length=1024)
    about_title = models.CharField(max_length=1024)
    about_description = models.CharField(max_length=1024)
    about_subtitle_1 = models.CharField(max_length=1024)
    about_text_1 = models.CharField(max_length=1024)
    about_subtitle_2 = models.CharField(max_length=256, default='English - Intermediate')
    about_text_2 = models.CharField(max_length=1024)
    steps_title = models.CharField(max_length=1024)
    # step
    feat_title = models.CharField(max_length=1024)
    feat_cta = models.CharField(max_length=1024)
    feat_find = models.CharField(max_length=1024)
    feat_time = models.CharField(max_length=1024)
    feat_law = models.CharField(max_length=1024)
    feat_happy = models.CharField(max_length=1024)
    form = models.CharField(max_length=1024)
    bot_team = models.CharField(max_length=1024)
    bot_qa = models.CharField(max_length=1024)
    bot_chat = models.CharField(max_length=1024)
    bot_att = models.CharField(max_length=1024)
    bot_lng = models.CharField(max_length=1024)

    class Meta:
        verbose_name = 'Landing'
        verbose_name_plural = 'Landings'

    def __str__(self):
        return f'{self.language.__str__()} -> {self.hero_title}'


class LandingStep(models.Model):
    landing = models.ForeignKey(Landing, on_delete=models.CASCADE, related_name='steps')
    number = models.SmallIntegerField()
    title = models.CharField(max_length=1024)
    text = models.CharField(max_length=1024)
    time = models.SmallIntegerField()
    label = models.CharField(max_length=1024)

    class Meta:
        verbose_name = 'Landing Step'
        verbose_name_plural = 'Landing Steps'

    def __str__(self):
        return f'{self.landing.__str__()} -> number: {self.number} -> {self.title}'


class SEOPage(models.Model):
    pass


class KeyWord(models.Model):
    pass

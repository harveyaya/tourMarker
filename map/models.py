from django.db import models

# Create your models here.
class Person(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return u'%s' % (self.name)


class Record(models.Model):
    id = models.AutoField(primary_key=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    begin_time = models.DateField(auto_now=True, auto_created=True)
    duration = models.IntegerField(default=1)
    # photos = models.ImageField(null=True, blank=True)
    photos = models.ImageField(upload_to='Photo/')
    person = models.ManyToManyField(Person, null=True, blank=True, related_name='record')

    class Meta:
        db_table = 'Record'



from django.db import models

# Create your models here.
class Record(models.Model):
    id = models.AutoField(primary_key=True)
    longitute = models.FloatField()
    latitude = models.FloatField()
    begin_time = models.DateField(auto_now=True, auto_created=True)
    duration = models.IntegerField(default=1)
    photos = models.ImageField(null=True, blank=True)

    class Meta:
        db_table = 'Record'

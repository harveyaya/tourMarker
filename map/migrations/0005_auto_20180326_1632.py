# Generated by Django 2.0.3 on 2018-03-26 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0004_auto_20180326_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='photos',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
# Generated by Django 2.0.3 on 2018-04-03 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0007_auto_20180403_0248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='photos',
            field=models.ImageField(default=1, upload_to=''),
            preserve_default=False,
        ),
    ]

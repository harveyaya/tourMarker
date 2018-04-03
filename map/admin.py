from django.contrib import admin

# Register your models here.
from .models import (Record, Person)

class RecordAdmin(admin.ModelAdmin):
    list_display = ('id','longitude','latitude', 'begin_time')

admin.site.register(Record, RecordAdmin)

class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

admin.site.register(Person, PersonAdmin)
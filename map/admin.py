from django.contrib import admin

# Register your models here.
from .models import (Record)

class RecordAdmin(admin.ModelAdmin):
    list_display = ('id','longitude','latitude')

admin.site.register(Record, RecordAdmin)
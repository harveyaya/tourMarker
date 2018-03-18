from django.contrib import admin

# Register your models here.
from .models import (Record)

class RecordAdmin(admin.ModelAdmin):
    list_display = ('longitute','latitude')

admin.site.register(Record, RecordAdmin)
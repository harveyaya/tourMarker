from rest_framework import serializers
from .models import Record

class AllRecordSerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    begin_time = serializers.DateField()
    duration = serializers.IntegerField()
    photos = serializers.ImageField(allow_empty_file=True)
    class Meta:
        model = Record
        fields = ('longitude', 'latitude', 'begin_time', 'duration',  'photos')
from rest_framework import serializers
from .models import Record

class AllRecordSerializer(serializers.ModelSerializer):
    # latitude = serializers.FloatField()
    # longitude = serializers.FloatField()
    # begin_time = serializers.DateField()
    # duration = serializers.IntegerField()
    # photos = serializers.ImageField(allow_null=True, allow_empty_file=True, use_url=True)

    photo_url = serializers.SerializerMethodField()
    class Meta:
        model = Record
        fields = ('id', 'longitude', 'latitude', 'begin_time', 'duration', 'photo_url')

    def get_photo_url(self, car):
        request = self.context.get('request')
        photo_url = car.get('photos')
        return request.build_absolute_uri(photo_url)
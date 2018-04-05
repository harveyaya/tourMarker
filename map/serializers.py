from rest_framework import serializers
from .models import Record, Photo, Person

class AllRecordSerializer(serializers.ModelSerializer):
    # latitude = serializers.FloatField()
    # longitude = serializers.FloatField()
    # begin_time = serializers.DateField()
    # duration = serializers.IntegerField()
    # photos = serializers.ImageField(allow_null=True, allow_empty_file=True, use_url=True)


    class Meta:
        model = Record
        fields = ('id', 'longitude', 'latitude', 'begin_time', 'duration')

class RecordPhotoSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = Photo
        fields = ('id', 'photo_url')
    # In order to get photo url and serialize
    def get_photo_url(self, photo):
        request = self.context.get('request')
        photo_url = photo.get('image')
        return request.build_absolute_uri(photo_url)

class RecordPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'name')
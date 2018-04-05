from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from .serializers import AllRecordSerializer, RecordPhotoSerializer, RecordPersonSerializer
from .models import Record, Person, Photo
from django.forms.models import model_to_dict

class AllRecordAPI(APIView):
    def get(self, request):
        records = Record.objects.all()
        records_values = records.values()
        serialized_record = AllRecordSerializer(records_values, many=True, context={"request": request})
        print(serialized_record.data)

        n = records.count()
        photos_list = [None] * n
        i = 0
        for record in records:
            photo_temp = Photo.objects.filter(record=record)
            # print(photo_temp)
            serialized_photo = RecordPhotoSerializer(photo_temp, many=True, context={"request":request})
            photos_list[i] = serialized_photo.data
            i += 1
        print(photos_list)

        person_list = [None] * n
        i = 0
        for record in records:
            person_temp = Person.objects.prefetch_related('record_person').filter(record_person=record).values()
            serialized_person = RecordPersonSerializer(person_temp, many=True, context={"request": request})
            person_list[i] = serialized_person.data
            i += 1
        print(person_list)

        res = [None] * len(serialized_record.data)
        for i in range(len(serialized_record.data)):
            res[i] = [serialized_record.data[i], photos_list[i], person_list[i]]

        json = JSONRenderer().render(res)

        return Response(json, status=status.HTTP_200_OK)
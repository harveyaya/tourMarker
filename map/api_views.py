from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status
from .serializers import AllRecordSerializer
from .models import Record

class AllRecordAPI(APIView):
    def get(self, request):
        record = Record.objects.all().values()
        # print(record)
        serializer = AllRecordSerializer(record, many=True, context={"request":request})
        # print(serializer.data)
        json = JSONRenderer().render(serializer.data)
        # print(json)
        # return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(json, status=status.HTTP_200_OK)
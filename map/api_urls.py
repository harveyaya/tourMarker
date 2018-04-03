from django.conf.urls import url
from .api_views import (
    AllRecordAPI,
)

urlpatterns = [
    # ------------ APIS ------------ #
    url(r'^add/record/$', AllRecordAPI.as_view(), name='add_record'),
]
from django.conf.urls import url

from .views import (
    WelcomeView,
)

urlpatterns = [
    url(r'^welcome/$', WelcomeView.as_view(), name = "diary_name"),
]
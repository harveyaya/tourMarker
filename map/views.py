from django.shortcuts import render

from django.views.generic import View

from .models import Record

class WelcomeView(View):
    template_name = "welcome.html"
    def get(self, request):
        record = Record.objects.all().values()
        print(record)
        context = {record: record}
        return render(request, self.template_name, context)

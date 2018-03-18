#from django.http import HttpResponse
from django.shortcuts import render
def hello(request):
    context          = {}
    context['title'] = 'Welcome to TourMarker'
    return render(request, 'welcome.html', context)

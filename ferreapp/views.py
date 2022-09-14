from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm

def mainView(request):
    return render(request, 'main.html', {
        'form': UserCreationForm
    })

def loginView(request):
    
    if(request.method == "POST"):
        print(request.POST)
    
    return render(request, 'login.html', {
        'form': UserCreationForm
    })
    
def registerView(request):
    return render(request, 'register.html')

def tasksView(request):
    return render(request, 'tasks.html')
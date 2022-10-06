from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError

from .models import Producto
from .forms import ProductoForm

values = ["producto", "desc", "precio", "cantidad"]

def mainView(request):
    return render(request, 'main.html', {
        'productos': Producto.objects.all()
    })

def loginView(request):
    
    if(request.method == "POST"):
        print(request.POST)
    
    return render(request, 'login.html', {
        'form': UserCreationForm
    })

@login_required
def signout(request):
    logout(request)
    return redirect('home')
    
def registerView(request):
    if request.method == 'GET':
        return render(request, 'register.html')
        
    else:
        if request.POST['password1'] == request.POST['password2']:
            try:
                user = User.objects.create_user(username=request.POST['username'], password=request.POST['password1'])
                user.save()
                login(request, user)
                return redirect('admin')
            except IntegrityError:
                return render (request, 'register.html', {
                    'form': UserCreationForm,
                    "error" : 'El usuario ya existe' 
                })
        return render (request, 'register.html', {
            'form': UserCreationForm,
            "error" : 'Contraseñas no coinciden' 
        })
        
def search(request):
    return render(request, 'main.html', {
        'productos': Producto.objects.filter(nombre__startswith=request.POST["search"])
    })
        
def signin(request):
    if request.method == 'GET':    
        return render(request, 'login.html')
    else:
        print(request.POST)
        User = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        if User is None:
            return render(request, 'login.html', {
                'form' : AuthenticationForm,
                'error' : 'Nombre o clave incorrecta'
            })
        
        else:
            login(request, User)
            return redirect('admin')

@login_required
def crudView(request):
    return render(request, 'crud.html', {
        'productos': Producto.objects.all(),
        'form': ProductoForm
    })
    
def getData(request):
    if(request.method == "POST"):
        data = Producto.objects.get( id=request.POST["id"] )
        return JsonResponse({'nombre': data.nombre, 'image': data.imagen.name, 'desc': data.descripcion, 'stock': data.stock, 'precio': data.precio })
    
    return redirect('admin')
 
@login_required   
def createView(request):
    print(request.FILES)
    
    if(request.method == "GET"):
        return redirect('admin')
    
    form = ProductoForm(request.POST or None, request.FILES or None)
    
    if form.is_valid():
        form.save()
        return redirect('admin')
    else:
        print(form.errors)
        messages.error(request, form.errors)
        return redirect('admin')
    
@login_required
def editView(request):
    producto = Producto.objects.get(id=request.POST["idV"])
    
    form = ProductoForm(request.POST or None, request.FILES or None, instance=producto)
    
    if form.is_valid() and request.POST:
        form.save()
    
    return redirect('admin')

@login_required    
def deleteView(request, id):
    producto = Producto.objects.get(id=id)
    producto.delete()
    
    return redirect('admin')
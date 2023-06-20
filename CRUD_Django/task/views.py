from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
# modelo creado para registrar usuario
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.http import HttpResponse


# Create your views here.
def home(request):
    return render(request, 'home.html')


def signup(request):

    if request.method == 'GET':
        return render(request, 'signup.html', {'form': UserCreationForm})
    else:

        if request.POST['password1'] == request.POST['password2']:
            # registrar user
            try:
                user = User.objects.create_user(
                    username=request.POST['username'], password=request.POST['password1'])
                user.save()  # Guarda en la base de datos SQLite por defecto
                # Con esto se crea una cookie de autenticacion para usar los datos del usuario luego en la aplicacion
                login(request, user)
                return redirect('task')
            except:
                return render(request, 'signup.html', {
                    'form': UserCreationForm, 'error': 'Username already exist'})
        return HttpResponse('Password do not match')


def task(request):
    return render(request, 'task.html')

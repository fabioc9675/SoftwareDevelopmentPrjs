from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
# modelo creado para registrar usuario
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.db import IntegrityError
from .forms import TaskForm
from .models import Task


# Create your views here.
def home(request):
    return render(request, 'home.html')


def signup(request):

    if request.method == 'GET':
        return render(request, 'signup.html', {
            'form': UserCreationForm
        })
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
            except IntegrityError:  # manejo de excepciones de forma manual.
                return render(request, 'signup.html', {
                    'form': UserCreationForm,
                    'error': 'User already exists'
                })
        return render(request, 'signup.html', {
            'form': UserCreationForm,
            'error': 'Password do not match'
        })


def task(request):
    tasks = Task.objects.filter(user=request.user, datecompleted__isnull=True)
    return render(request, 'task.html', {'tasks': tasks})


def task_detail(request, task_id):
    if request.method == 'GET':
        try:
            # task = Task.objects.get(pk=task_id)
            task = get_object_or_404(Task, pk=task_id, user=request.user)
            form = TaskForm(instance=task)
            return render(request, 'task_detail.html', {
                'task': task,
                'form': form
            })
        except ValueError:
            return render(request, 'task_detail.html', {
                'task': task,
                'form': form,
                'error': 'Error updating task'
            })
    else:
        # Asi me aseguro de solo actualizar mis tareas
        task = get_object_or_404(Task, pk=task_id, user=request.user)
        form = TaskForm(request.POST, instance=task)
        form.save()
        return redirect('task')


def create_task(request):
    if request.method == 'GET':
        return render(request, 'create_task.html', {
            'form': TaskForm
        })
    else:
        try:
            form = TaskForm(request.POST)
            new_task = form.save(commit=False)
            new_task.user = request.user
            new_task.save()
            return redirect('task')
        except ValueError:
            return render(request, 'create_task.html', {
                'form': TaskForm,
                'error': 'Please provide valid data'
            })


def signout(request):
    logout(request)
    return redirect('home')


def signin(request):
    if request.method == 'GET':
        return render(request, 'signin.html', {
            'form': AuthenticationForm,
        })
    else:
        user = authenticate(
            request, username=request.POST['username'], password=request.POST['password'])
        if user is None:
            return render(request, 'signin.html', {
                'form': AuthenticationForm,
                'error': 'Username or Password is incorrect'
            })
        else:
            # Guardo la seccion del usuario que acaba de logearse
            login(request, user)
            return redirect('task')

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Task(models.Model):  # Crearemos una tabla en la base de datos
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    datecompleted = models.DateTimeField(null=True)
    important = models.BooleanField(default=False)
    # Relacion con la tabla de users, cuando se elimine el usuario, se elimina la tarea en cascada
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        # esto compone como visualizar los datos en el panel admin
        return self.title + '- by ' + self.user.username

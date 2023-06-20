from django.contrib import admin
from .models import Task


class TaskAdmin(admin.ModelAdmin):
    # esto es para mostrar los campos de solo lectura en el panel admin
    readonly_fields = ("created", )


# Register your models here.
admin.site.register(Task, TaskAdmin)

# Use of DJANGO as CRUD

create a virtual environment

- creacion del entorno virtual `virtualenv -p python3 env`
- Activar el entorno virtual `.\env\Scripts\activate`
- para exportar los paquetes del env `pip freeze > requirements.txt`
- para instalar de nuevo los paquetes `pip install -r .\requirements.txt`
- para desactivar el entorno `deactivate`

- Creacion de proyecto local `django-admin startproject djangocrud .`
- Crear una aplicacion en el proyecto `python manage.py startapp tasks`
- Creacion de las tablas para el proyecto `python manage.py migrate`
- Instalacion del framework rest `pip install djangorestframework`

## Configuracion REST Framework

- Configuracion del Back y el Front
- Instalacion de manejador de cors `pip install django-cors-headers`

- Hacer la migracion de las tablas `python .\manage.py makemigrations`
- Crea las tablas en SQLite `python manage.py migrate tasks`
- Creacion de super usuario `python manage.py createsuperuser`

# Use of DJANGO as CRUD

create a virtual environment

- creacion del entorno virtual `python -m virtualenv -p python3 env`
- Activar el entorno virtual `.\env\Scripts\activate`
- para exportar los paquetes del env `pip freeze > requirements.txt`
- para instalar de nuevo los paquetes `pip install -r .\requirements.txt`
- para desactivar el entorno `deactivate`

- Creacion de proyecto local `django-admin startproject djangocrud .`
- Creacion de Applicacion `python .\manage.py startapp task`
- Creacion de tablas en la base de datos `python .\manage.py migrate`
- Compila el models.py y crea tabla `python .\manage.py makemigrations` y entonces `python .\manage.py migrate`
- Creacion de un superusuario para la app `python .\manage.py createsuperuser` user: admin, pass: admin, solo por ejemplo

- Tutorial deployment en [render](https://render.com/docs/deploy-django)
- Instalar soporte para base de datos de render posgress `pip install dj-database-url`
- Librera de conexion `pip install psycopg2-binary`
- modulo para servir archivos statics `pip install whitenoise[brotli]`
- modulo para servir la aplicacion `pip install gunicorn`

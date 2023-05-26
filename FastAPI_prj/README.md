# Use of FastAPI as REST API

create a virtual environment

-   creacion del entorno virtual `virtualenv -p python3 python-mongo`
-   Activar el entorno virtual `.\python-mongo\Scripts\activate`
-   para exportar los paquetes del env `pip freeze > requirements.txt`
-   para instalar de nuevo los paquetes `pip install -r .\requirements.txt`
-   para desactivar el entorno `deactivate`

## Correr el servidor

-   `uvicorn app:app` dentro del archivo app correr el objeto app
-   `uvicorn app:app --reload` dentro del archivo app correr el objeto app para recargar

## Python packages

-   pip install fastapi
-   pip install uvicorn

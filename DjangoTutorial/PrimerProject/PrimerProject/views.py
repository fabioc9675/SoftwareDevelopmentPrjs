from django.http import HttpResponse
import datetime

# Esta es la primera funcion vista, nos devulve una rerspuesta HTTP
def saludo(request): 
    return HttpResponse("Hola Alumnos, esta es nuestra primera pagina con Django")

def despedida(request):
    return HttpResponse("Hasta luego alumnos de Django")


# Mostrar fecha y hora atuales, contenido dinamico
def damefecha(request):
    fecha_actual = datetime.datetime.now()

    documento = """<html>
        <body>
        <h1>Fecha y hora actuales %s</h1>
        </body>
        </html>""" % fecha_actual

    return HttpResponse(documento)

# Crear una vista que calcule edad en un futuro
def calculeEdad(request, edad, agno):
    # edadActual = 18
    periodo = agno - 2019
    edadFutura = edad + periodo

    documento = """<html>
        <body>
        <h2>En el año %s tendras %s años</h2>
        </body>
        </html>""" %(agno, edadFutura)

    return HttpResponse(documento)

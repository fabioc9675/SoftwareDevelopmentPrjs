from django.http import HttpResponse
import datetime


def saludo(request):
    # Esta es la primera funcion vista, nos devulve una rerspuesta HTTP
    return HttpResponse("Hola Alumnos, esta es nuestra primera pagina con Django")


def despedida(request):
    return HttpResponse("Hasta luego alumnos de Django")


def damefecha(request):
    # Mostrar fecha y hora atuales, contenido dinamico
    fecha_actual = datetime.datetime.now()

    documento = """<html>
        <body>
        <h1>Fecha y hora actuales %s</h1>
        </body>
        </html>""" % fecha_actual

    return HttpResponse(documento)


def calculeEdad(request, edad, agno):
    # Crear una vista que calcule edad en un futuro
    # edadActual = 18
    periodo = agno - 2019
    edadFutura = edad + periodo

    documento = """<html>
        <body>
        <h2>En el año %s tendras %s años</h2>
        </body>
        </html>""" % (agno, edadFutura)

    return HttpResponse(documento)

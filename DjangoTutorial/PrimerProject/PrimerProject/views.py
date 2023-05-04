from django.http import HttpResponse
from django.template import Template, Context
import datetime


def saludo(request):
    # Esta es la primera funcion vista, nos devulve una rerspuesta HTTP
    # Apertura y lectura de la plantilla
    doc_externo = open(
        "C:/GitHub/ReactNativeProjects/SoftwareDevelopmentPrjs/DjangoTutorial/PrimerProject/PrimerProject/plantillas/miplantilla.html")
    plt = Template(doc_externo.read())
    doc_externo.close()

    # Creacion del contexto
    ctx = Context()

    documento = plt.render(ctx)

    return HttpResponse(documento)


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

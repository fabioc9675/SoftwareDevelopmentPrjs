from django.http import HttpResponse
from django.template import Template, Context
import datetime
import os.path


class Persona(object):

    def __init__(self, nombre, apellido):
        self.nombre = nombre
        self.apellido = apellido


def saludo(request):
    # Esta es la primera funcion vista, nos devulve una rerspuesta HTTP
    # Apertura y lectura de la plantilla

    # Agregaremos esta variable a el codigo HTML
    p1 = Persona("Fabian", "Castaño")
    nombre = "Juan"
    apellido = "Diaz"
    ahora = datetime.datetime.now()

    path_rel = (os.path.join(os.path.dirname(__file__), "plantillas/miplantilla.html").replace('\\','/'))
    #doc_externo = open(
    #    "C:/GitHub/ReactNativeProjects/SoftwareDevelopmentPrjs/DjangoTutorial/PrimerProject/PrimerProject/plantillas/miplantilla.html")
    doc_externo = open(path_rel)
    plt = Template(doc_externo.read())
    doc_externo.close()

    # Creacion del contexto
    # para pasar variables al html hay que usar diccionarios
    ctx = Context({"nombre_persona": nombre,
                  "apellido_persona": apellido, "momento_actual": ahora, "persona_alumno": p1})

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

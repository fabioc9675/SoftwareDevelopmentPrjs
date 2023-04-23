from django.http import HttpResponse

# Esta es la primera funcion vista, nos devulve una rerspuesta HTTP
def saludo(request): 
    return HttpResponse("Hola Alumnos, esta es nuestra primera pagina con Django")

def despedida(request):
    return HttpResponse("Hasta luego alumnos de Django")
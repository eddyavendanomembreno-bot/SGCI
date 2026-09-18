# lógica de la aplicación - capa de servicio
#Obtiene las bodegas utilizando el repositorio.
#Esta capa contiene la lógica de la aplicación.
#Por ahora la operación es sencilla, pero aquí se agregarán las reglas de negocio cuando sean necesarias


from app.modules.bodega.repository import obtener_bodegas


def listar_bodegas():
   
# Solicita al repository las bodegas de la base de datos
    return obtener_bodegas()

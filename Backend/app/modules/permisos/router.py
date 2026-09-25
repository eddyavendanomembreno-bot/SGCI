# Recibe un id_usuario, consulta su rol en el repository y
# combina esa información con el diccionario PERMISOS_POR_ROL
# para devolver el rol y la lista de permisos asociados.
# Si el usuario no existe, lanza ValueError para que el router lo convierta en 404.

from fastapi import APIRouter, HTTPException

from app.modules.permisos.service import obtener_permisos

router = APIRouter(
    prefix="/permisos",
    tags=["Permisos"]
)


@router.get("/{id_usuario}")
def consultar_permisos(id_usuario: int):
    try:
        return obtener_permisos(id_usuario)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
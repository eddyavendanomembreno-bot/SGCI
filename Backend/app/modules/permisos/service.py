# Expone el endpoint GET /permisos/{id_usuario} que devuelve
# el rol y la lista de permisos del usuario indicado.
# Si el usuario no existe, responde con código 404.

from app.core.permisos import PERMISOS_POR_ROL
from app.modules.permisos.repository import obtener_rol_usuario


def obtener_permisos(id_usuario: int):
    """Devuelve el rol y la lista de permisos del usuario."""
    rol = obtener_rol_usuario(id_usuario)
    if rol is None:
        raise ValueError("Usuario no encontrado")

    return {
        "id_usuario": id_usuario,
        "rol": rol,
        "permisos": sorted(PERMISOS_POR_ROL.get(rol, set())),
    }
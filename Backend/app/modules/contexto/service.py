from app.modules.contexto.repository import (
    obtener_bodegas_usuario,
    obtener_proyectos_usuario
)


def obtener_contextos(id_usuario: int):
    bodegas = obtener_bodegas_usuario(id_usuario)
    proyectos = obtener_proyectos_usuario(id_usuario)

    return {
        "bodegas": bodegas,
        "proyectos": proyectos
    }
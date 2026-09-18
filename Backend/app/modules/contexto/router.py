from fastapi import APIRouter
from app.modules.contexto.service import obtener_contextos

router = APIRouter(
    prefix="/contextos",
    tags=["Contextos"]
)


@router.get("/{id_usuario}")
def consultar_contextos(id_usuario: int):
    return obtener_contextos(id_usuario)
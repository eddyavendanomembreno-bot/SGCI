## Api

from fastapi import APIRouter

from app.modules.bodega.service import listar_bodegas


# Router encargado de las operaciones relacionadas con bodegas.
router = APIRouter(
    prefix="/bodegas",
    tags=["Bodegas"]
)

 # Endpoint para obtener las bodegas registradas.
# El router recibe la petición HTTP y delega la operación a la capa de servicio.
@router.get("/")
def obtener_bodegas():

# Llama al service para obtener las bodegas
    return listar_bodegas()









#router.py
#api - capa de presentacion
# endpoint de login

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.modules.login.service import autenticar

router = APIRouter(
    prefix="/login",
    tags=["Login"]

)

# esquema de entrada del login
class LoginRequest(BaseModel):
    correo: str
    password: str

@router.post("/")

#autenticar y devolver datos
def login(credenciales: LoginRequest):
    try:
        return autenticar(credenciales.correo, credenciales.password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

    


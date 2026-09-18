#repository.py
# base de datos - consulta postgre - capa de acceso a datos
# busca un usuario por correo y trae su rol asociado

from sqlalchemy import text
from app.core.database import engine

#se busca usuario por correo junto a rol
def obtenerUserCorreo(correo: str):
    with engine.connect() as connection:
        resultado = connection.execute(
           text("""
                Select
                    u.id_usuario,
                    u.nombre,
                    u.correo,
                    u.password,
                    u.estado,
                    r.id_rol,
                    r.nombre as rol
                from usuario u
                Join rol r ON r.id_rol = u.id_rol
                where u.correo = :correo  
           """), 
           {"correo" : correo}
        )

        fila = resultado.fetchone()

        if fila is None:
            return None

        return {
            "id_usuario": fila.id_usuario,
            "nombre": fila.nombre,
            "correo": fila.correo,
            "password": fila.password,
            "estado": fila.estado,
            "id_rol": fila.id_rol,
            "rol": fila.rol
        }
        
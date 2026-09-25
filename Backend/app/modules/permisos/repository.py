# Se encarga únicamente de consultar la base de datos PostgreSQL.
# No conoce reglas de negocio ni HTTP: solo devuelve datos crudos.
# Consulta el rol asociado a un usuario específico.

from sqlalchemy import text
from app.core.database import engine


def obtener_rol_usuario(id_usuario: int):
    """Devuelve el nombre del rol del usuario, o None si no existe."""
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT r.nombre AS rol
                FROM usuario u
                JOIN rol r ON r.id_rol = u.id_rol
                WHERE u.id_usuario = :id_usuario
            """),
            {"id_usuario": id_usuario}
        )
        fila = resultado.fetchone()
        return fila.rol if fila else None
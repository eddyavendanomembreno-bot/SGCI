from sqlalchemy import text
from app.core.database import engine


def obtener_bodegas_usuario(id_usuario: int):
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    b.id_bodega,
                    b.nombre,
                    b.codigo,
                    b.ubicacion,
                    b.tipo
                FROM usuario_bodega ub
                JOIN bodega b
                    ON b.id_bodega = ub.id_bodega
                WHERE ub.id_usuario = :id_usuario
                ORDER BY b.nombre
            """),
            {"id_usuario": id_usuario}
        )

        return [
            {
                "id_bodega": fila.id_bodega,
                "nombre": fila.nombre,
                "codigo": fila.codigo,
                "ubicacion": fila.ubicacion,
                "tipo": fila.tipo
            }
            for fila in resultado
        ]


def obtener_proyectos_usuario(id_usuario: int):
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    p.id_proyecto,
                    p.nombre,
                    p.ubicacion,
                    p.estado
                FROM usuario_proyecto up
                JOIN proyecto p
                    ON p.id_proyecto = up.id_proyecto
                WHERE up.id_usuario = :id_usuario
                ORDER BY p.nombre
            """),
            {"id_usuario": id_usuario}
        )

        return [
            {
                "id_proyecto": fila.id_proyecto,
                "nombre": fila.nombre,
                "ubicacion": fila.ubicacion,
                "estado": fila.estado
            }
            for fila in resultado
        ]
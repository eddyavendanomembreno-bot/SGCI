# Base de datos - consulta PostgreSQL - capa de acceso a datos
# Obtiene las bodegas registradas en la base de datos.
# Esta capa se encarga únicamente del acceso a los datos.
# Aquí colocamos las consultas SQL relacionadas con bodegas.

from sqlalchemy import text

from app.core.database import engine


def obtener_bodegas():
    # Consulta las bodegas almacenadas en PostgreSQL
    with engine.connect() as connection:
        resultado = connection.execute(
            text("""
                SELECT
                    id_bodega,
                    nombre,
                    codigo,
                    tipo,
                    ubicacion
                FROM bodega
                ORDER BY id_bodega
            """)
        )

        bodegas = []

        # Convertimos cada fila de la consulta en un diccionario
        for fila in resultado:
            bodegas.append({
                "id_bodega": fila.id_bodega,
                "nombre": fila.nombre,
                "codigo": fila.codigo,
                "tipo": fila.tipo,
                "ubicacion": fila.ubicacion
            })

        return bodegas
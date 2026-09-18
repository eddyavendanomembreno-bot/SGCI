from sqlalchemy import text

from app.core.database import engine


try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))

        print("Conexión a PostgreSQL exitosa.")
        print("Resultado:", result.scalar())

except Exception as error:
    print("Error al conectar con PostgreSQL:")
    print(error)

# Pruebas unitarias del módulo de permisos
# Verifica el comportamiento del endpoint GET /permisos/{id_usuario}

#Para intalar las librerías poner en la temrinal:
# 1) cd Backend
# 2) pip install pytest httpx

# En la terminal dentro de Backend/, corré: pytest tests/ -v

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.modules.permisos import service as permisos_service


client = TestClient(app)


# ============================================================
# CASO 1: Usuario existente devuelve 200 y sus permisos
# ============================================================

def test_usuario_existente_devuelve_200_con_permisos():
    """
    Si el usuario existe en la BD, el endpoint debe devolver 200
    y un JSON con id_usuario, rol y lista de permisos no vacía.
    """
    response = client.get("/permisos/1")

    assert response.status_code == 200

    data = response.json()

    assert data["id_usuario"] == 1
    assert "rol" in data
    assert "permisos" in data
    assert isinstance(data["permisos"], list)
    assert len(data["permisos"]) > 0


# ============================================================
# CASO 2: Usuario inexistente devuelve 404
# ============================================================

def test_usuario_inexistente_devuelve_404():
    """
    Si el id_usuario no existe en la BD, el endpoint debe devolver
    404 con el mensaje 'Usuario no encontrado'.
    """
    response = client.get("/permisos/999999")

    assert response.status_code == 404

    data = response.json()

    assert data["detail"] == "Usuario no encontrado"


# ============================================================
# CASO 3: Rol sin permisos definidos devuelve lista vacía
# ============================================================

def test_rol_sin_permisos_definidos_devuelve_lista_vacia(monkeypatch):
    """
    Si el rol del usuario no existe en el diccionario PERMISOS_POR_ROL,
    el servicio debe devolver una lista vacía en lugar de fallar.
    Este caso simula un escenario de datos inconsistente.
    """
    # Mockeamos la consulta a la BD para simular un rol desconocido
    monkeypatch.setattr(
        permisos_service,
        "obtener_rol_usuario",
        lambda id_usuario: "RolDesconocido",
    )

    resultado = permisos_service.obtener_permisos(12345)

    assert resultado["rol"] == "RolDesconocido"
    assert resultado["permisos"] == []
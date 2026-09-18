# SGCI - Sistema de Gestión y Control de Inventario

Sistema de Gestión y Control de Inventario (SGCI) desarrollado para Parque Tempisque.

El sistema busca facilitar la gestión de materiales, inventario, bodegas, solicitudes, movimientos y usuarios relacionados con los proyectos de construcción.

---

## Tecnologías utilizadas

### Backend
- Python 3.14
- FastAPI
- SQLAlchemy
- Psycopg
- Uvicorn
- python-dotenv

### Base de datos
- PostgreSQL

### Frontend
- Next.js
- React
- TypeScript

---

## Arquitectura

El proyecto utiliza una combinación de:

- Monolito Modular
- Arquitectura en Capas

El backend se organiza por módulos funcionales y cada módulo separa las responsabilidades principales.

### Capas del backend

```text
Router
   ↓
Service
   ↓
Repository
   ↓
PostgreSQL
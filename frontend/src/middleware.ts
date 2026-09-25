
// Middleware de Next.js que se ejecuta antes de que el usuario acceda
// a cualquier ruta del dashboard. Verifica que el rol que se lee desde la cookie "usuario_rol"
// tenga permiso para acceder a la ruta solicitada.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Mapa de rutas protegidas y los roles que pueden acceder a cada una.
// si requerie ajustes hay que ver tambien con el backend app/core/permisos.py.
const RUTAS_POR_ROL: Record<string, string[]> = {
  "/dashboard/materiales": [
    "Administrador",
    "Jefe de Bodega",
    "Encargado",
    "Jefa de Construcción",
  ],
  "/dashboard/trazabilidad": [
    "Administrador",
    "Jefe de Bodega",
    "Encargado",
    "Jefa de Construcción",
  ],
  "/dashboard/reportes": [
    "Administrador",
    "Jefe de Bodega",
    "Jefa de Construcción",
  ],
  "/dashboard/transferencias": ["Jefe de Bodega"],
  "/dashboard/pedidos": ["Encargado"],
  "/dashboard/configuracion": ["Administrador"],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Buscar si la ruta solicitada está protegida
  const rutaProtegida = Object.keys(RUTAS_POR_ROL).find(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );

  if (!rutaProtegida) {
    return NextResponse.next();
  }

  // leer el rol desde la cookie
  const rolCookie = request.cookies.get("usuario_rol")?.value;

  // si no hay cookie de rol redirigir al login
  if (!rolCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const rol = decodeURIComponent(rolCookie);
  const rolesPermitidos = RUTAS_POR_ROL[rutaProtegida];

  // si el rol no está permitido, redirigir al dashboard con mensaje de error
  if (!rolesPermitidos.includes(rol)) {
    const url = new URL("/dashboard", request.url);
    url.searchParams.set("error", "sin-permiso");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuración: en qué rutas se ejecuta el middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};
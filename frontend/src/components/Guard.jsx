// Guard.jsx
// Envuelve cualquier elemento de la UI y decide si mostrarlo o no según el permiso del usuario.

"use client";

import { usePermisos } from "@/hooks/usePermisos";

export default function Guard({ permiso, children, fallback = null }) {
  const { cargando, tienePermiso } = usePermisos();

  // Mientras se cargan los permisos, no mostramos nada
  // (evita un parpadeo visual)
  if (cargando) return null;

  // Si el usuario no tiene el permiso, mostramos el fallback
  // (por defecto: nada)
  if (!tienePermiso(permiso)) return fallback;

  // Si tiene permiso, mostramos el contenido
  return children;
}
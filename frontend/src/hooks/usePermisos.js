
// Lee el id_usuario desde sessionStorage, consulta el backend mediante permisoService y devuelve la lista de permisos y una
// función auxiliar 'tienePermiso(permiso)'.

"use client";

import { useEffect, useState } from "react";
import { obtenerPermisos } from "@/services/permisoService";

const CACHE_KEY = "permisos_usuario";

export function usePermisos() {
  const [permisos, setPermisos] = useState([]);
  const [rol, setRol] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");

    if (!usuarioGuardado) {
      setCargando(false);
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    // Intentar leer del caché primero
    const cache = sessionStorage.getItem(CACHE_KEY);
    if (cache) {
      try {
        const parsed = JSON.parse(cache);
        if (parsed.id_usuario === usuario.id_usuario) {
          setPermisos(parsed.permisos);
          setRol(parsed.rol);
          setCargando(false);
          return;
        }
      } catch {
        // caché corrupto, se ignora y se hace fetch
      }
    }

    obtenerPermisos(usuario.id_usuario)
      .then((data) => {
        setPermisos(data.permisos);
        setRol(data.rol);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
      })
      .catch(() => {
        setPermisos([]);
        setRol(null);
      })
      .finally(() => setCargando(false));
  }, []);

  const tienePermiso = (permiso) => permisos.includes(permiso);

  return { permisos, rol, cargando, tienePermiso };
}
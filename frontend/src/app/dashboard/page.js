"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [contexto, setContexto] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    const contextoGuardado = sessionStorage.getItem("contexto");

    if (!usuarioGuardado) {
      router.push("/");
      return;
    }

    if (!contextoGuardado) {
      router.push("/contexto");
      return;
    }

    setUsuario(JSON.parse(usuarioGuardado));
    setContexto(JSON.parse(contextoGuardado));
  }, [router]);

  if (!usuario || !contexto) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Cargando...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold text-gray-800">
            SGCI
          </h1>

          <p className="text-gray-600 mt-2">
            Bienvenido, {usuario.nombre}
          </p>

          <p className="text-gray-600">
            Rol: {usuario.rol}
          </p>

          <hr className="my-6 border-gray-200" />

          <h2 className="text-xl font-bold text-gray-800">
            Contexto actual
          </h2>

          <p className="text-gray-600 mt-3">
            Tipo: {contexto.tipo_contexto}
          </p>

          <p className="text-gray-600">
            Nombre: {contexto.nombre}
          </p>

          {contexto.codigo && (
            <p className="text-gray-600">
              Código: {contexto.codigo}
            </p>
          )}

          <p className="text-gray-600">
            Ubicación: {contexto.ubicacion}
          </p>

        </div>

      </div>

    </main>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { obtenerContextos } from "@/services/contextoService";

export default function Contexto() {
  const [usuario, setUsuario] = useState(null);

  const [contextos, setContextos] = useState({
    bodegas: [],
    proyectos: [],
  });

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const cargarDatos = async () => {
      const usuarioGuardado = sessionStorage.getItem("usuario");

      if (!usuarioGuardado) {
        setError("No hay una sesión activa.");
        setCargando(false);
        return;
      }

      const usuarioActual = JSON.parse(usuarioGuardado);
      setUsuario(usuarioActual);

      try {
        const datos = await obtenerContextos(usuarioActual.id_usuario);
        setContextos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

const seleccionarBodega = (bodega) => {
  const contextoSeleccionado = {
    tipo_contexto: "BODEGA",
    ...bodega,
  };

  sessionStorage.setItem(
    "contexto",
    JSON.stringify(contextoSeleccionado)
  );

  router.push("/dashboard");
};

const seleccionarProyecto = (proyecto) => {
  const contextoSeleccionado = {
    tipo_contexto: "PROYECTO",
    ...proyecto,
  };

  sessionStorage.setItem(
    "contexto",
    JSON.stringify(contextoSeleccionado)
  );

  router.push("/dashboard");
};
  if (cargando) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Cargando contextos...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-red-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Selección de contexto
        </h1>

        <div className="mt-4 mb-8">
          <p className="text-gray-600">
            Bienvenido, {usuario.nombre}
          </p>

          <p className="text-gray-600">
            Rol: {usuario.rol}
          </p>
        </div>

        {/* BODEGAS */}
        {contextos.bodegas.length > 0 && (
          <section className="mb-8">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Bodegas disponibles
            </h2>

            <div className="space-y-4">

              {contextos.bodegas.map((bodega) => (
                <div
                  key={bodega.id_bodega}
                  className="border border-gray-200 rounded-lg p-5"
                >

                  <h3 className="text-lg font-bold text-gray-800">
                    {bodega.nombre}
                  </h3>

                  <p className="text-gray-600">
                    Código: {bodega.codigo}
                  </p>

                  <p className="text-gray-600">
                    Ubicación: {bodega.ubicacion}
                  </p>

                  <p className="text-gray-600">
                    Tipo: {bodega.tipo}
                  </p>

                  <button
                    type="button"
                    onClick={() => seleccionarBodega(bodega)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    Seleccionar
                  </button>

                </div>
              ))}

            </div>
          </section>
        )}

        {/* PROYECTOS */}
        {contextos.proyectos.length > 0 && (
          <section>

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Proyectos disponibles
            </h2>

            <div className="space-y-4">

              {contextos.proyectos.map((proyecto) => (
                <div
                  key={proyecto.id_proyecto}
                  className="border border-gray-200 rounded-lg p-5"
                >

                  <h3 className="text-lg font-bold text-gray-800">
                    {proyecto.nombre}
                  </h3>

                  <p className="text-gray-600">
                    Ubicación: {proyecto.ubicacion}
                  </p>

                  <p className="text-gray-600">
                    Estado: {proyecto.estado}
                  </p>

                  <button
                    type="button"
                    onClick={() => seleccionarProyecto(proyecto)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer"
                  >
                    Seleccionar
                  </button>

                </div>
              ))}

            </div>
          </section>
        )}

        {/* SIN CONTEXTOS */}
        {contextos.bodegas.length === 0 &&
          contextos.proyectos.length === 0 && (
            <p className="text-gray-600">
              No tiene bodegas ni proyectos asignados.
            </p>
          )}

      </div>
    </main>
  );
}
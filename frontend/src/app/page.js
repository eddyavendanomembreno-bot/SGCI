"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { iniciarSesion } from "@/services/authService";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

const [error, setError] = useState("");
const [cargando, setCargando] = useState(false);

 const manejarSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setCargando(true);

  try {
    const usuario = await iniciarSesion(correo, password);

sessionStorage.setItem("usuario", JSON.stringify(usuario));

router.push("/contexto");
  } catch (error) {
    setError(error.message);
  } finally {
    setCargando(false);
  }
};

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            SGCI
          </h1>

          <p className="text-gray-500 mt-2">
            Sistema de Gestión y Control de Inventario
          </p>
        </div>

        <form onSubmit={manejarSubmit} className="space-y-5">

          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Correo electrónico
            </label>

            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@sgci.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
  <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm">
    {error}
  </div>
)}
        <button
  type="submit"
  disabled={cargando}
  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"
>
  {cargando ? "Ingresando..." : "Ingresar"}
</button>

        </form>

      </div>
    </main>
  );
}
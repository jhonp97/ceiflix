'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error al registrarse");

      // Guardar token
      localStorage.setItem("token", data.data.token);

      setMensaje("✅ Registro exitoso");
      router.push("/"); // redirigir a inicio
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h1>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        <label className="block mb-2">Nombre de usuario</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        <label className="block mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        <button type="submit" className="bg-green-600 hover:bg-green-700 w-full py-2 rounded mt-2">
          Registrarse
        </button>

        {mensaje && <p className="mt-4 text-sm text-center">{mensaje}</p>}
      </form>
    </div>
  );
}

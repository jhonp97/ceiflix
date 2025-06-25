'use client';

import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const res = await fetch(`${BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Error al cargar perfil");

        setUser(data.data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPerfil();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-4">👤 Mi Perfil</h1>

      {error && <p className="text-red-500">❌ {error}</p>}

      {user && (
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <p><b>Usuario:</b> {user.username}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Registrado en:</b> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

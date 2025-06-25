'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MisPeliculasPage() {
  const [peliculas, setPeliculas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    const cargarPeliculas = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMensaje("⚠️ Debes iniciar sesión para ver esta página.");
        return router.push("/login");
      }

      try {
        const res = await fetch(`${BASE_URL}/peliculas/mis-peliculas`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.msg || "Error al traer películas");

        setPeliculas(data.peliculas || []);
      } catch (err) {
        setMensaje(`❌ ${err.message}`);
      }
    };

    cargarPeliculas();
  }, [router]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-white">🎥 Mis Películas Vistas</h1>

      {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {peliculas.map(p => (
          <div key={p._id} className="bg-gray-900 p-2 rounded shadow text-white">
            <img
              src={`https://image.tmdb.org/t/p/w500${p.poster}`}
              alt={p.titulo}
              className="rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{p.titulo}</h2>
            <p className="text-sm text-gray-400">⭐ {p.calificacion} / 5</p>
          </div>
        ))}
      </div>
    </div>
  );
}

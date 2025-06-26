'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetallePelicula() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [calificacion, setCalificacion] = useState(3); // valor por defecto

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  useEffect(() => {
    const fetchPelicula = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tmdb/pelicula/${id}`);
        if (!res.ok) throw new Error("Película no encontrada");
        const data = await res.json();
        setPelicula(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) fetchPelicula();
  }, [id]);

  const handleGuardar = async () => {
    const token = localStorage.getItem("token"); // Ajusta esto si usas context

    if (!token) {
      setMensaje("Debes iniciar sesión para guardar la película.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/peliculas/agregar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          tmdbId: pelicula.id,
          titulo: pelicula.title,
          poster: pelicula.poster_path,
          calificacion: calificacion
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Error al guardar película");
      setMensaje("✅ Película guardada en tu lista");
    } catch (err) {
      setMensaje(`❌ ${err.message}`);
    }
  };

  if (error) return <p className="text-red-500 text-center mt-8">❌ {error}</p>;
  if (!pelicula) return <p className="text-center mt-8 text-gray-400">Cargando película...</p>;

  return (
    <div
    className="min-h-screen bg-cover bg-center text-white p-6"
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${pelicula.backdrop_path})`,
    }}
  >
    <div className="bg-black/80 bg-opacity-70 p-6 rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{pelicula.title}</h1>
      <p className="text-gray-300 mb-4">{pelicula.release_date} • ⭐ {pelicula.vote_average}</p>
  
      <img
        src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
        alt={pelicula.title}
        className="rounded-lg shadow-lg object-contain mx-auto"
      />
  
      <p className="text-lg text-gray-200 mb-6">{pelicula.overview}</p>
  
      <div className="flex items-center gap-4 mb-4">
        <label htmlFor="rating" className="text-white">Tu calificación:</label>
        <select
          id="rating"
          value={calificacion}
          onChange={(e) => setCalificacion(Number(e.target.value))}
          className="p-2 rounded bg-gray-800 text-white"
        >
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>
      </div>
  
      <button
        onClick={handleGuardar}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Marcar como vista
      </button>
  
      {mensaje && <p className="mt-4 text-center text-sm text-white">{mensaje}</p>}
    </div>
  </div>
  );
}

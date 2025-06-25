'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function DetallePelicula() {
  const { id } = useParams();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

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

    if (id) {
      fetchPelicula();
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center mt-8">❌ {error}</p>;
  }

  if (!pelicula) {
    return <p className="text-center mt-8 text-gray-400">Cargando película...</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{pelicula.title}</h1>
      <p className="text-gray-500 mb-4">{pelicula.release_date} • ⭐ {pelicula.vote_average}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
        alt={pelicula.title}
        className="w-full rounded-lg mb-4 shadow"
      />
      <p className="text-lg text-gray-300">{pelicula.overview}</p>
    </div>
  );
}

'use client'

import { useEffect, useState } from "react";
import { MovieCards } from "@/components/ui/MovieCards";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");

  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      if (genero) params.append("genero", genero);
      if (anio) params.append("anio", anio);
      if (minRating) params.append("minRating", minRating);
      if (sortBy) params.append("sortBy", sortBy);

      const res = await fetch(`${BASE_URL}/tmdb/filtrar?${params.toString()}`);
      const data = await res.json();
      setPeliculas(data.results || []);
    } catch (error) {
      console.error("Error al buscar películas:", error.message);
    }
  };

  // ...&language=es-ES para que los titulos se vean en español
  useEffect(() => {
    const cargarPopulares = async () => {
      try {
        const res = await fetch(`${BASE_URL}/tmdb/populares`);
        const data = await res.json();
        setPeliculas(data.results || []);
      } catch (error) {
        console.error("Error al cargar películas populares:", error.message);
      }
    };
    cargarPopulares();
  }, []);

  return (
    <div className="p-6">
      {/* Buscador / Filtros */}
      <form onSubmit={handleBuscar} className="flex flex-wrap gap-4 mb-6 justify-center">
        <select value={genero} onChange={e => setGenero(e.target.value)} className="p-2 rounded bg-gray-900 text-white">
          <option value="">-- Género --</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="18">Drama</option>
          <option value="878">Ciencia Ficción</option>
          <option value="10749">Romance</option>
        </select>

        <input
          type="number"
          value={anio}
          onChange={e => setAnio(e.target.value)}
          placeholder="Año (ej: 2024)"
          className="p-2 rounded bg-gray-900 text-white"
        />

        <input
          type="number"
          value={minRating}
          onChange={e => setMinRating(e.target.value)}
          placeholder="Calificación mínima"
          className="p-2 rounded bg-gray-900 text-white"
        />

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="p-2 rounded bg-gray-900 text-white">
          <option value="popularity.desc">Más populares</option>
          <option value="vote_average.desc">Mejor puntuadas</option>
          <option value="release_date.desc">Más recientes</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Buscar</button>
      </form>

      {/* Catálogo de Películas */}
      <section className="flex flex-wrap gap-6 justify-center">
        {peliculas.length === 0 ? (
          <p className="text-gray-400">No se encontraron resultados</p>
        ) : (
          peliculas.map(({ id, title, release_date, vote_average, poster_path }) => (
            <MovieCards
              key={id}
              title={title}
              year={release_date?.split("-")[0]}
              rating={vote_average}
              poster={poster_path}
            />
          ))
        )}
      </section>
    </div>
  );
}

'use client';

import { useEffect, useState } from "react";
import { MovieCards } from "@/components/ui/MovieCards";

export default function Home() {
  const [peliculas, setPeliculas] = useState([]);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // ...&language=es-ES para que los titulos se vean en español
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`)
      .then((res) => res.json())
      .then((data) => setPeliculas(data.results))
      .catch((err) => console.error("Error al traer películas", err));
  }, []);

  return (
// Buscador + filtro



// Catalogo de peliculas 

<section className="flex flex-wrap gap-6 p-6 justify-center">
  {peliculas.map(({ id, title, release_date, vote_average, overview, poster_path }) => (
    <MovieCards
      key={id}
      title={title}
       year={release_date?.split("-")[0]}
      rating={vote_average}
      // overview={overview}
      poster={poster_path}
    />
  ))}
</section>
  );
}
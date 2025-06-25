// app/pelicula/[id]/page.jsx
import MovieCard from "@/components/ui/MovieCards";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

async function getPelicula(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`);
  if (!res.ok) {
    throw new Error("No se pudo cargar la película");
  }
  return res.json();
}

export default async function PeliculaPage({ params }) {
  const { id } = params;
  const peli = await getPelicula(id);

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <MovieCard
        title={peli.title}
        image={peli.poster_path}
        date={peli.release_date}
        rating={peli.vote_average}
        overview={peli.overview}
      />
    </section>
  );
}
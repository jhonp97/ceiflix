
export const MovieCards = ({ title, year, rating, overview, poster }) => {
    const imageURL = poster

    // fondo de pantalla https://image.tmdb.org/t/p/w500/original/${poster}`
      ? `https://image.tmdb.org/t/p/w500${poster}`
      : "/no-image.png"; // imagen por defecto si no hay poster
  
    return (
      <article >
        <img
          src={imageURL}
          alt={`Cartel de ${title}`}
          className="w-full h-72 object-cover rounded-md mb-4"
        />
        <h3 className="font-bold text-xl text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">Año: {year}</p>
        <p className="text-sm text-gray-600 mb-1">Valoración: {rating}</p>
        <p className="text-gray-700 text-sm mt-2 line-clamp-3">{overview}</p>
      </article>
    );
  };
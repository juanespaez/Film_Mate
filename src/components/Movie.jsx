// Movie.jsx

const Movie = ({ movie, movieClick }) => {
  return (
    <div 
      className="card col-12 col-md-6 col-lg-2 mt-5 movie" // Agregado 'movie'
      style={{
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{movie.name}</h5>
        <button className="btn btn-primary" onClick={() => movieClick(movie)}>
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default Movie;

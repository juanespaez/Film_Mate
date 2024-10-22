import { useEffect, useState } from "react";
import Category from "./components/Category";
import Movie from "./components/Movie";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_API_URL,
  import.meta.env.VITE_API_KEY
);

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [recommend, setRecommend] = useState();

  const traerCategorias = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*, movies (*)")
      .limit(10, { foreignTable: "movies" });
    setCategories(data);
  };

  const traerRecomendaciones = async (name) => {
    const resp = await fetch(`http://127.0.0.1:5000/recommend?movie=${name}`);
    const data = await resp.json();
    setRecommend(data);
  };

  const onCategoryClick = (category) => setSelectedCategory(category);
  const onMovieClick = (movie) => setSelectedMovie(movie);

  useEffect(() => {
    traerCategorias();
  }, []);

  useEffect(() => {
    if (!selectedMovie) return;
    traerRecomendaciones(selectedMovie.name);
  }, [selectedMovie]);

  useEffect(() => {
    setSelectedMovie();
  }, [selectedCategory]);

  return (
    <div className="container">
      <p>Categoria seleccionada: {selectedCategory?.name}</p>
      <p>Película seleccionada: {selectedMovie?.name}</p>

      <div className="row gap-5 justify-content-center align-items-center">
        {categories?.map((category) => (
          <Category
            key={category.id}
            category={category}
            click={onCategoryClick}
          />
        ))}
      </div>

      <div className="row gap-5 justify-content-center align-items-center">
        {selectedCategory?.movies.map((movie) => (
          <Movie key={movie.id} movie={movie} movieClick={onMovieClick} />
        ))}
      </div>

      <ul>
        {recommend?.map((movie) => (
          <li key={movie}>{movie}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

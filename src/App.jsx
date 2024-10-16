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

  const traerCategorias = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*, movies (*)")
      .limit(10, { foreignTable: "movies" });
    setCategories(data);
  };

  const onCategoryClick = (category) => setSelectedCategory(category);
  const onMovieClick = (movie) => setSelectedMovie(movie);

  useEffect(() => {
    traerCategorias();
  }, []);

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
    </div>
  );
};

export default App;

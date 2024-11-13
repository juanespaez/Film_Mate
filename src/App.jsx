// App.jsx

import { useEffect, useState } from "react";
import Category from "./components/Category";
import Movie from "./components/Movie";
import './styles.css';
import { supabase } from "./supabaseClient";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [recommend, setRecommend] = useState();
  const [theme, setTheme] = useState("light");

  const traerCategorias = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*, movies (*)")
      .limit(20, { foreignTable: "movies" });
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
    setRecommend(null); // Limpiar recomendaciones al cambiar de categoría
  }, [selectedCategory]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);  

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`container ${theme}`}>
      <button
        onClick={toggleTheme}
        className="toggle-button"
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Dark theme
      </button>
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

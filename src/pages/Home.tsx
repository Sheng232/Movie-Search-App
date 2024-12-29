import { useState, useEffect } from "react";
import appStyle from "./Home.module.scss";
import LikeButton from "../components/LikeButton";
import { Link } from "react-router-dom";

function App() {
  //api_key  = 7c6359fb38405964278bde77066e6096

  type Movies = Movie[]

  interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    name?: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    first_air_date?: string;
  }


  const [movieData, setMovieData] = useState<Movies>(
    JSON.parse(localStorage.getItem("movies") || "[]")
  );

  useEffect(()=>{
    const fetchTrendingMovies = async() =>{
        try{
            if(movieData.length === 0){
              const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=7c6359fb38405964278bde77066e6096`);
              const data = await res.json();
              setMovieData(data.results);
            }
            
        }
        catch(error){
            console.log(error);
        }
    }
    fetchTrendingMovies();
}, [])

  const [movieQuery, setMovieQuery] = useState<string>("");

  function fetchMovie(event: { preventDefault: () => void }) {
    event.preventDefault();
    const fetchData = async (query: string) => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=7c6359fb38405964278bde77066e6096&language=en-US&query=${query}&page=1&include_adult=false`
        );
        const data = await res.json();
        setMovieData(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(movieQuery);
    setMovieQuery("");
  }

  
  useEffect(()=>{
    const data = JSON.stringify(movieData);
    JSON.stringify(localStorage.setItem("movies", data));
  }, [movieData])

  function updateQueryState(event: React.ChangeEvent<HTMLInputElement>) {
    setMovieQuery(event.target.value);
  }

  const displayMovies = movieData.map((movie: Movie, index: number) => {
    const { id, title, poster_path, release_date, name, first_air_date} = movie;
    return (
      poster_path && (
        <div key={index} className={appStyle.movieContainer}>
          <LikeButton />
          <Link to={`${id}`}>
            <h2>{title ? title : name}</h2>
            <p>{release_date ? release_date : first_air_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`}
              alt=""
            />
          </Link>
        </div>
      )
    );
  });

  return (
    <>
      <h1 className={appStyle.appTitle}>Sheng's Movie Search App</h1>
      <form className={appStyle.searchForm} onSubmit={fetchMovie}>
        <input
          type="text"
          placeholder="Movie Name"
          onChange={updateQueryState}
          value={movieQuery}
        />
        <button type="submit">Search</button>
      </form>

      <section className={appStyle.movieData}>
        {displayMovies}
      </section>
    </>
  );
}

export default App;

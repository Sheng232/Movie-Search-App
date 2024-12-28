import { useState } from 'react'
import appStyle from './App.module.scss'
import LikeButton from './components/LikeButton';

function App() {
  const [movieData, setMovieData] = useState<any>([])
  const [movieQuery, setMovieQuery] = useState<string>("");

  function fetchMovie(event: { preventDefault: () => void; }){
    event.preventDefault();
    const fetchData = async (query:string) => {
      try{
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ae21a1dbba5bee442174e3d4e60fb1df&language=en-US&query=${query}&page=1&include_adult=false`);
        const data = await res.json();
        setMovieData(data.results);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchData(movieQuery);
    setMovieQuery("");
    console.log(movieData);
  }

  
  function updateQueryState(event: React.ChangeEvent<HTMLInputElement>){
    setMovieQuery(event.target.value);
  }

  const displayMovies = movieData.map((movie:any, index: number)=>{
    const {title, poster_path, release_date} = movie;
    return(
      poster_path && <div key={index} className={appStyle.movieContainer}>
        <LikeButton />
        <h2>{title}</h2>
        <p>{release_date}</p>
        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`} alt="" />
      </div>
    )
  })

  return (
    <>
      <h1 className={appStyle.appTitle}>Sheng's Movie Search App</h1>
      <form className={appStyle.searchForm}
        onSubmit={fetchMovie}
      >
        <input type="text" placeholder='Movie Name'
          onChange={updateQueryState}
          value={movieQuery}
        />
        <button type="submit">Search</button>
      </form>

      <section className={appStyle.movieData}>
        {displayMovies}
      </section>
    </>
  )
}

export default App

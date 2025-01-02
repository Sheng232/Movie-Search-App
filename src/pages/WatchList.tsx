import ReturnButton from "../components/ReturnButton"
import appStyle from "./WatchList.module.scss"

export default function WatchList() {

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
    const watchList = JSON.parse(localStorage.getItem("watchlist") || "[]");

    const displayWatchList = watchList.map((movie: Movie) => {
        const {title, poster_path} = movie;
        return(
            <div key={movie.id} className={appStyle.movieCard}>
                <h2>{title}</h2>
                <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt={title} />
            </div>
        )})
        
        return(
            <>
                <ReturnButton />
                <h1 className={appStyle.watchListTitle}>Your Watch List</h1>
                <section className={appStyle.watchList}>
                    {displayWatchList}
                </section>
            </>
        )
    }
    
    


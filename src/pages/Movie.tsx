import { useParams, Link } from "react-router-dom"
import {useState, useEffect} from "react"
import appStyle from "./Movie.module.scss"
import LikeButton from "../components/LikeButton";

export default function Movie(){ 
    
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
        first_air_date: string;
      }
    interface BelongsToCollection {
        id: number;
        name: string;
        poster_path: string | null;
        backdrop_path: string | null;
      }
    
    interface Genre {
        id: number;
        name: string;
      }
      
      interface ProductionCompany {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
      }
      
      interface ProductionCountry {
        iso_3166_1: string;
        name: string;
      }
      
      interface SpokenLanguage {
        iso_639_1: string;
        name: string;
      }
      
      interface MovieDetails {
        adult: boolean;
        backdrop_path: string | null;
        belongs_to_collection: BelongsToCollection | null;
        budget: number;
        genres: Genre[];
        homepage: string | null;
        id: number;
        imdb_id: string | null;
        origin_country: string[];
        original_language: string;
        original_title: string;
        overview: string | null;
        popularity: number;
        poster_path: string | null;
        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        release_date: string;
        revenue: number;
        runtime: number | null;
        spoken_languages: SpokenLanguage[];
        status: string;
        tagline: string | null;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
      }

    const params: number = Number(useParams().MovieId);
    const movieArray: Movie[] = JSON.parse(localStorage.getItem("movies") || "[]");
    const movieData: Movie | undefined = movieArray.find(movie => params === movie.id);
    const [movieDetails, setMovieDetails] = useState<any>({});

    useEffect(()=>{
        const fetchMovieDetails = async() =>{
            try{
                const res = await fetch(`https://api.themoviedb.org/3/movie/${params}?api_key=7c6359fb38405964278bde77066e6096&language=en-US`);
                const data: MovieDetails = await res.json();
                setMovieDetails(data);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchMovieDetails();
    }, []);


    if (!movieData) {
        return <h1>Movie not found</h1>;
    }

    const { title, poster_path, overview, popularity, name}  = movieData;
    const { homepage } = movieDetails;

    return(
        <>
            <Link className={appStyle.returnButton} to="/">Return</Link>
            <section className={appStyle.movieDetails}>
                <div className={appStyle.title}>
                    <h1>{title? title : name}</h1> <LikeButton />
                </div>
                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${poster_path}`} alt={title} />
                <p>{overview}</p>
                <p><strong>Popularity: </strong>{popularity}</p>
                {movieDetails && <a href={homepage} target="_blank">Link to the movie page: {homepage}</a>}
            </section>
        </>
            
    )
}
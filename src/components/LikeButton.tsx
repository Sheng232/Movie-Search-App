import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ButtonStyle from "./Components.module.scss"
import { useState } from "react";

export default function LikeButton({id}: {id: number}){
    const [isLiked, setIsLiked] = useState<boolean>(false);

    function toggleLike(){
        setIsLiked(prevState => !prevState);
    }
    function toggleToWatchList(){
        //Add the movie to the watchlist
        const movieData = JSON.parse(localStorage.getItem("movies") || "[]");
        const movie = movieData.find((movie: { id: number; }) => movie.id === id);
        const currentStorage = JSON.parse(localStorage.getItem("watchlist") || "[]");

        if(!isLiked){
            const newStorage = [...currentStorage, movie];
            localStorage.setItem("watchlist", JSON.stringify(newStorage));
        }
        else{
            const newStorage = currentStorage.filter((movie: { id: number; }) => movie.id !== id);
            localStorage.setItem("watchlist", JSON.stringify(newStorage));
        }
    }

    return(
        <>
            {isLiked? <FaHeart 
                className={`${ButtonStyle.likeButton} ${ButtonStyle.pop}`}
                onClick={
                    ()=>{
                        toggleLike();
                        toggleToWatchList();
                    }}
            />
            : <FaRegHeart 
                className={ButtonStyle.likeButton}
                onClick={
                    ()=>{
                        toggleLike();
                        toggleToWatchList();
                    }}/>
            }
        </>
    )
}
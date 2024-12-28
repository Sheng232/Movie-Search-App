import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ButtonStyle from "./Components.module.scss"
import { useState } from "react";

export default function LikeButton(){
    const [isLiked, setIsLiked] = useState<boolean>(false);

    function toggleLike(){
        setIsLiked(prevState => !prevState);
    }

    return(
        <>
            {isLiked? <FaHeart 
                className={`${ButtonStyle.likeButton} ${ButtonStyle.pop}`}
                onClick={toggleLike}
            />
            : <FaRegHeart 
                className={ButtonStyle.likeButton}
                onClick={toggleLike}/>
            }
        </>
    )
}
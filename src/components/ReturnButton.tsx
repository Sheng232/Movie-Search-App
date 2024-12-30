import { Link } from "react-router-dom";
import appStyle from "./Components.module.scss";

export default function ReturnButton() {
    return(
        <Link className={appStyle.returnButton} to="/">Return</Link>
    )
}
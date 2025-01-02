import { FaStopwatch } from "react-icons/fa";
import appStyle from "./Components.module.scss";
import { Link } from "react-router-dom";

export default function WatchListButton() {

  return (
    <>
      <Link to="/watchlist" className={appStyle.watchListButton}>
          <button>
              <FaStopwatch />
          </button>
      </Link>
    </>

  );
}
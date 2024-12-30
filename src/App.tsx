import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Layout from "./pages/Layout";
import WatchList from "./pages/WatchList";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="watchlist" element={<WatchList />} />
            <Route path=":MovieId" element={<Movie />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

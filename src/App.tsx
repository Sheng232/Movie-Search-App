import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Outlet />}>
            <Route path="/" element={<Home />} />
            <Route path=":MovieName" element={<Movie />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

import { Outlet } from "react-router-dom";
import WatchListButton from "../components/WatchListButton";

export default function Layout() {
  return (
    <>
        <Outlet />
        <WatchListButton />
    </>
  );
}
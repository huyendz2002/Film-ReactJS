import logo from "./logo.svg";
import "./App.css";
import Home from "./component/Home/Home";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import MovieDetails from "./component/movieDetails/MovieDetails";

function App() {
  return (
    <div className="bg-[#3d3d3d] px-14 py-6">
      <div className="w-36 flex text-white mx-auto justify-between ">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "text-[#ff0077]" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/movielist"}
          className={({ isActive }) => (isActive ? "text-[#ff0077]" : "")}
        >
          Movies
        </NavLink>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default App;

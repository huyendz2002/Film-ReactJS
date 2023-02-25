import "./App.css";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-black px-14 py-6 max-lg:px-0 max-lg:w-screen">
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

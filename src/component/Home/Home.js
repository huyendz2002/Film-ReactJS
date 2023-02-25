import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";

// https://api.themoviedb.org/3/movie/now_playing?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''
// https://api.themoviedb.org/3/movie/top_rated?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''
// https://api.themoviedb.org/3/movie/popular?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''
// https://api.themoviedb.org/3/search/movie?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''

const Home = () => {
  return (
    <div className="home w-full mt-8  max-lg:w-full">
      <div className="w-full h-[500px] relative">
        <img
          className="w-full h-full object-cover rounded-xl"
          src="https://nld.mediacdn.vn/2019/4/25/3515432-endgamedek-15561710302491765206118.jpg"
          alt=""
        />
        <div className="w-[40rem] h-auto absolute left-8 bottom-8  max-md:w-fit">
          <h2 className="text-white font-bold text-4xl max-md:text-3xl mb-8">
            Avengers: Endgame
          </h2>
          <div className="text-white w-[15rem] flex justify-between mb-8 ">
            <span className="p-2 rounded-lg border-2 ">Action</span>
            <span className="p-2 rounded-lg border-2 ">Adventure</span>
            <span className="p-2 rounded-lg border-2 ">Drama</span>
          </div>
          <div className="flex w-[30rem] max-md:w-max">
            <Link
              to={"/movie/299534"}
              className="cursor-pointer text-white w-[12rem] text-2xl bg-[#ff0077] py-2 rounded-lg flex justify-center items-center "
            >
              Watch <i className="fa-solid fa-circle-play ml-3  "></i>
            </Link>
            <div className="bg-[#666666]/90 h-12 w-12 flex justify-center items-center ml-4 rounded-xl">
              <i className="fa-solid fa-plus font-medium text-white text-lg"></i>
            </div>
          </div>
        </div>
      </div>

      <Category nameLink="now_playing" name="Now Playing"></Category>
      <Category nameLink="top_rated" name="Top Rated"></Category>
      <Category nameLink="popular" name="Popular" page={10}></Category>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = (props) => {
  const [category, setCategory] = useState([]);
  const [count, setCount] = useState(0);
  const [leftOpacity, setLeftOpacity] = useState(true);
  const [rightOpacity, setRightOpacity] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const callapi = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.nameLink}?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''&page=${props.page}`
      );
      setCategory(callapi.data.results);
    }
    fetchData();
  }, [props.nameLink, props.page]);
  const styles = {
    transform: `translateX(${count * -5}%)`,
  };
  return (
    <div className=" h-[26rem] mt-4 overflow-hidden relative">
      <div className=" top-10 text-white font-semibold text-xl flex justify-between items-center">
        {props.name}
        <div className="w-10 flex justify-between">
          <i
            onClick={() => {
              if (count > 0) {
                setCount((count) => count - 1);
              }
              if (count === 19) {
                setRightOpacity(false);
              }
              if (count === 1) {
                setLeftOpacity(true);
              }
            }}
            className={`fa-solid fa-angle-left cursor-pointer ${
              leftOpacity ? "opacity-50" : ""
            } `}
          ></i>
          <i
            onClick={() => {
              if (count < 19) {
                setCount((count) => count + 1);
                setLeftOpacity(false);
              }
              if (count === 18) {
                setRightOpacity(true);
              }
            }}
            className={`fa-solid fa-angle-right cursor-pointer ${
              rightOpacity ? "opacity-50" : ""
            }`}
          ></i>
        </div>
      </div>
      <div
        style={styles}
        className={`categorys absolute flex shrink-0 max-[426px]:gap-0 max-[426px]:translate-x-[0%] w-auto h-[23rem] top-10 transition-all`}
      >
        {category.map((item, index) => (
          <CategoryItem key={item.id} data={item} index={index}></CategoryItem>
        ))}
      </div>
      <style></style>
    </div>
  );
};

const CategoryItem = (props) => {
  return (
    <div className=" px-2  max-[426px]:w-screen">
      <div className=" w-[16rem] h-full bg-slate-800 p-3 rounded-lg relative max-[426px]:w-full">
        <img
          className="w-full h-[14rem] object-cover rounded-lg "
          src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
          alt=""
        />
        <div className="absolute top-5 right-5 bg-[#666666]/90 h-8 w-8 flex justify-center items-center ml-4 rounded-xl">
          <i className="fa-solid fa-plus font-medium text-white text-lg"></i>
        </div>
        <h3 className="text-white mt-2 text-[14px]">{props.data.title}</h3>
        <div className="absolute w-[14.5rem] bottom-3  max-[426px]:left-1/2  max-[426px]:translate-x-[-50%]">
          <div className="flex justify-between mt-2 text-[12px]">
            <span className="text-white">{props.data.release_date}</span>
            <span className="text-white">
              {props.data.vote_average}
              <i className="fa-solid fa-star text-yellow-500 ml-2"></i>
            </span>
          </div>
          <Link
            to={`/movie/${props.data.id}`}
            className="cursor-pointer text-white w-[12rem] mt-2 mx-auto text-xl bg-[#ff0077] py-2 rounded-lg flex justify-center items-center "
          >
            Watch Now<i className="fa-solid fa-circle-play ml-3  "></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;

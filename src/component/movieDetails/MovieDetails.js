import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// https://api.themoviedb.org/3/movie/{movie_id}?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''
// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''
const MovieDetails = (props) => {
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const { movieId } = useParams();
  //   console.log(movieId);
  //   console.log(genres);
  useEffect(() => {
    async function fetchData() {
      const callapi = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''`
      );
      // console.log(callapi);
      setDetails(callapi.data);
      setGenres(callapi.data.genres);
    }
    fetchData();
  }, [movieId]);
  return (
    <Fragment>
      <div className="bg-[#3d3d3d] h-auto">
        <div className="w-full h-[600px] relative">
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
            alt=""
          />
          <div className="absolute bg-black/50 inset-0"></div>
          <div className="absolute w-1/2 h-2/3 bottom-0  translate-y-[50%]  left-[50%] translate-x-[-50%]">
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              alt=""
            />
          </div>
        </div>
        <h1 className="mt-[15rem] text-white font-semibold text-3xl text-center">
          {details.title}
        </h1>
        <div className="flex mx-auto gap-4 max-w-max mt-8 ">
          {genres.length > 0 &&
            genres.map((item) => (
              <span
                key={item.id}
                className="text-[#ff0077] border-2 border-solid border-[#ff0077] p-2 rounded-full"
              >
                {item.name}
              </span>
            ))}
        </div>
        <p className="text-white mt-8 w-1/2 mx-auto text-center">
          {details.overview}
        </p>
        <h2 className="text-3xl text-white mt-8 text-center">Casts</h2>
        <div className="flex gap-8 mt-8 mx-auto w-2/3 ">
          <MovieCast id={movieId}></MovieCast>
        </div>
        <div className="flex justify-around mt-10">
          <MovieVideo id={movieId}></MovieVideo>
        </div>
        <h1 className="text-2xl text-white mt-8 p-5">Movies Similar</h1>
        <div className="flex justify-between  h-[25rem] p-5 ">
          <MovieSimilar id={movieId}></MovieSimilar>
        </div>
      </div>
    </Fragment>
  );
};

const MovieCast = (props) => {
  const [casts, setCasts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const callapi = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''`
      );
      // console.log(callapi);
      setCasts(callapi.data.cast);
    }
    fetchData();
  }, [props.id]);
  return (
    <Fragment>
      {casts.length > 0 &&
        casts.slice(0, 4).map((cast, index) => (
          <div key={cast.id} className="text-white h-full ">
            <img
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt=""
              className=""
            />
            <h3 className="text-center text-xl mt-1">{cast.name}</h3>
          </div>
        ))}
    </Fragment>
  );
};

const MovieVideo = (props) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const callapi = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''`
      );
      // console.log(callapi);
      setVideos(callapi.data.results);
    }
    fetchData();
  }, [props.id]);
  return (
    <Fragment>
      {videos.length > 0 &&
        videos.slice(0, 2).map((video, index) => (
          <div key={video.id} className=" max-w-max ">
            <iframe
              width="700"
              height="503"
              src={`https://www.youtube.com/embed/${video.key}`}
              title="Avatar: The Way of Water | Deborah L. Scott, Costume Designer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
    </Fragment>
  );
};

const MovieSimilar = (props) => {
  const [similars, setSimilars] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const callapi = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''`
      );
      // console.log(callapi);
      setSimilars(callapi.data.results);
    }
    fetchData();
  }, [props.id]);
  return (
    <Fragment>
      {similars.length > 0 &&
        similars.slice(0, 5).map((similar, index) => (
          <div
            key={similar.id}
            className="w-[16rem] h-full bg-slate-800 p-3 rounded-lg relative  "
          >
            <img
              className="w-full h-[14rem] object-cover rounded-lg "
              src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
              alt=""
            />
            <div className="absolute top-5 right-5 bg-[#666666]/90 h-8 w-8 flex justify-center items-center ml-4 rounded-xl">
              <i className="fa-solid fa-plus font-medium text-white text-lg"></i>
            </div>
            <h3 className="text-white mt-2 text-[14px]">{similar.title}</h3>
            <div className="absolute w-[14.5rem] bottom-3">
              <div className="flex justify-between mt-2 text-[12px]">
                <span className="text-white">{similar.release_date}</span>
                <span className="text-white">
                  {similar.vote_average}
                  <i className="fa-solid fa-star text-yellow-500 ml-2"></i>
                </span>
              </div>
              <Link
                to={`/movie/${similar.id}`}
                className="cursor-pointer text-white w-[12rem] mt-2 mx-auto text-xl bg-[#ff0077] py-2 rounded-lg flex justify-center items-center "
              >
                Watch Now<i className="fa-solid fa-circle-play ml-3  "></i>
              </Link>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

export default MovieDetails;

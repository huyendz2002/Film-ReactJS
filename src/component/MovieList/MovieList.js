import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const debounceValue = useDebounce(text, 50);

  // ..................................Pagination.........................................................

  // const arrPaginate = new Array(5).fill(0);
  const [data, setData] = useState("");
  const [pageCount, setPageCount] = useState(20);
  const itemsPerPage = 20;
  const [page, setPage] = useState(1);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(1);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  // const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = items.slice(itemOffset, endOffset);

  useEffect(() => {
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
    // console.log(pageCount, data.total_results);
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    // setSubmit(!submit);
    setPage(event.selected + 1);
  };

  // .......................................................................................

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const callapi = await axios
        .get(
          debounceValue
            ? `https://api.themoviedb.org/3/search/movie?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query='${debounceValue}'&page=${page}`
            : `https://api.themoviedb.org/3/movie/popular?api_key=d9fee3480f7dc1611fdc57aef19f3d15&query=''&page=${page}`
        )
        .then((response) => {
          // console.log(response);
          setMovieList(response.data.results);
          setData(response.data);
        });
      // console.log(callapi);
      setLoading(false);
    }
    fetchData();
  }, [submit, itemOffset]);
  return (
    <div className="h-[1800px] relative ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(!submit);
          // setText(e.target.value);
          // console.log("submit");
        }}
        className="max-w-max mx-auto mt-8"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here to search..."
          className="h-10 w-[30rem] bg-slate-800 text-white"
        />
        <button
          type="submit"
          className="text-white ml-4 bg-[#ff0077] w-10 h-10"
        >
          <i className="fa-solid fa-magnifying-glass ]"></i>
        </button>
      </form>
      <div className="w-12 h-12  mx-auto mt-4">
        {loading ? (
          <div className="w-12 h-12 border-4 border-dotted border-blue-500 animate-spin  border-r-transparent rounded-full  "></div>
        ) : (
          ""
        )}
      </div>
      <div className="grid grid-cols-5 gap-6 mt-8 ">
        {movieList.length > 0 &&
          movieList.map((movie, index) => (
            <Movie key={movie.id} data={movie}></Movie>
          ))}
      </div>
      <div className="PAGINATION absolute w-full bottom-10 left-[50%] translate-x-[-50%] flex justify-around">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

const Movie = (props) => {
  return (
    <div className="w-auto h-[23rem] bg-slate-800 p-3 rounded-lg relative  ">
      <img
        className="w-full h-[14rem] object-cover rounded-lg "
        src={` https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
        alt=""
      />
      <div className="absolute top-5 right-5 bg-[#666666]/90 h-8 w-8 flex justify-center items-center ml-4 rounded-xl">
        <i className="fa-solid fa-plus font-medium text-white text-lg"></i>
      </div>
      <h3 className="text-white mt-2 text-[12px]">
        {props.data.name || props.data.title}
      </h3>
      <div className=" absolute left-[50%] translate-x-[-50%] bottom-2 w-[230px]">
        <div className="flex justify-between mt-2 text-[12px]">
          <span className="text-white">
            {props.data.first_air_date || props.data.release_date}
          </span>
          <span className="text-white ">
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
  );
};

export default MovieList;

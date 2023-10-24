import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [searchInput, setSearchInput] = useState(params.get("q"));

  useEffect(() => {
    setSearchInput(params.get("q"));
  }, [params.get("q")]);

  function setSearchQuery() {
    navigate(`?q=${searchInput}`);
  }

  function clearSearch() {
    setSearchInput("");
    navigate(``);
  }
  return (
    <div className="flex relative">
      <input
        placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
      ></input>
      {searchInput ? (
        <button
          className="absolute right-[50px] h-[40px]"
          onClick={clearSearch}
        >
          X
        </button>
      ) : null}
      <BiSearch
        className="w-[30px] h-[100%] m-[5px] cursor-pointer"
        onClick={() => setSearchQuery()}
      />
    </div>
  );
}

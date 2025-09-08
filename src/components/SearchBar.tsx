import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
const SearchBar = () => {
  const navigate = useNavigate();
  // gives access to the query parameters in the URL
  const [searchParam] = useSearchParams();
  // Tries to read the "search" param. If it’s missing, it falls back to "" (empty string)
  const getSearchParams = searchParam.get("search") || "";
  // give the input initail value as getSearchParams
  const [search, setSearch] = useState(getSearchParams);

  return (
    <div className="flex flex-row gap-x-4">
      <div className="border px-4 py-2 rounded-lg w-80 flex flex-row justify-between">
        <input
          className="outline-none"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Product"
        />
        <button>
          <IoMdSearch size={26} />
        </button>
      </div>
      <button
        onClick={() => navigate(`?search=${search}`)}
        className="bg-yellow-300 py-1 px-10 rounded-lg "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

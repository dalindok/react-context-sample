import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
const SearchBar = () => {
  const [searchParam, setSearchParams] = useSearchParams();
  const search = searchParam.get("search") || "";
  const [localSearch, setLocalSearch] = useState(search);
  const [searchDebounce] = useDebounce(localSearch, 500);

  console.log("search", search);
  console.log("searchDebounce", searchDebounce);
  console.log("local search", localSearch);

  const setSearch = (filters: { search: string }) => {
    setSearchParams((params) => {
      console.log("params", params);
      if (filters.search !== undefined) {
        params.set("search", filters.search);
      }
      return params;
    });
  };

  useEffect(() => {
    setSearch({ search: searchDebounce });
  }, [searchDebounce]);

  return (
    <div className="flex flex-row gap-x-4">
      <div className="border px-4 py-2 rounded-lg w-80 flex flex-row justify-between">
        <input
          className="outline-none"
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          // onChange={(e) => setSearch({ search: e.target.value })}
          placeholder="Search Product"
        />
        <button>
          <IoMdSearch size={26} />
        </button>
      </div>
      {/* <button
        onClick={() => navigate(`?search=${search}`)}
        className="bg-yellow-300 py-1 px-10 rounded-lg "
      >
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;

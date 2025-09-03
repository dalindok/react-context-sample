import { IoMdSearch } from "react-icons/io";
import { useProduct } from "../contexts/useProduct";
const SearchBar = () => {
  const { search, setSearch } = useProduct();

  return (
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
  );
};

export default SearchBar;

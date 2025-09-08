import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { ListProduct } from "../components/ListProduct";
// import { useEffect } from "react";
// import { useProduct } from "../contexts/useProduct";

const HomePage = () => {
  // const {products, setProducts} = useProduct()

  const navigate = useNavigate();

  return (
    <div className=" m-6">
      <div className="flex flex-row justify-between">
        <p className="text-3xl font-bold">Product</p>
        <button
          onClick={() => {
            navigate("/addproduct");
          }}
          className="bg-yellow-300 py-1 px-10 rounded-lg "
        >
          Add new product
        </button>
      </div>
      <div className="flex flex-col items-center my-4">
        <img src="src/assets/Landing.png" alt="" className="h-[500px]" />
      </div>
      <SearchBar />
      <p className="mt-6 text-xl font-medium">Our Products</p>
      <ListProduct />
    </div>
  );
};

export default HomePage;

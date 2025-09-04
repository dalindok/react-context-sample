import type { ProductI } from "../types/ProductI";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductI;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const deleteProduct = () => {
    deleteProduct();
  };
  const navigate = useNavigate();
  return (
    <div className="p-2 m-2 rounded-md bg-white w-fit">
      <img
        src={product.image}
        alt="Product Image"
        className="w-[200px] h-[250px]"
      />

      <div className="my-2">
        <p className="">Name: {product.name}</p>

        <p className="font-light">Description: {product.description}</p>
        <div className="flex flex-row items-center gap-2">
          <p>Price: ${product.price}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={() => navigate(`/updateproduct/${product.id}`)}
          className="bg-yellow-300 py-1 px-10 rounded-lg "
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this product?")
            ) {
              deleteProduct();
            }
          }}
          className="bg-red-500 py-1 px-4 rounded-lg"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

import type { ProductI } from "../types/ProductI";
import { useProduct } from "../contexts/useProduct";
import { useNavigate } from "react-router-dom";

interface Props {
  // product prop of a product
  product: ProductI;
}

export const ProductItem: React.FC<Props> = ({ product }) => {
  const {
    setEditingId,
    setName,
    setDescription,
    setImage,
    setPrice,
    products,
  } = useProduct();

  // delete function call from context
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
        <p className="text-lg font-medium">{product.name}</p>
        <p className="font-light">{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
      <div className="flex flex-row justify-between items-center">
        <button
          onClick={() => {
            const findObj = products.find(
              (item: any) => item.id === product.id
            );
            if (findObj) {
              setName(findObj?.name);
              setDescription(findObj?.description);
              setPrice(findObj?.price);
              setImage(findObj?.image);
            }

            setEditingId(product.id);
            navigate("/addproduct");
          }}
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

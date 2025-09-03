import type { ProductI } from "../types/ProductI";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useProduct } from "../contexts/useProduct";

const ProductForm = () => {
  const {
    editingId,
    setEditingId,
    name,
    setName,
    description,
    setDescription,
    image,
    setImage,
    price,
    setPrice,
    updateProduct,
    createProduct,
  } = useProduct();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!ProductContext) return;

    const newProduct: ProductI = {
      // if editing ID is null it will generate new ID by uuidv4
      id: editingId ?? uuidv4(),
      name: name,
      description: description,
      image: image,
      price: price ?? "",
    };

    if (editingId) {
      updateProduct(editingId, newProduct);
      setEditingId(null);
      console.log("editingid", newProduct);
      console.log("setEditingId", setEditingId);
    } else {
      createProduct(newProduct);
      // console.log("new Product", newProduct);
    }
    navigate(-1);
  };
  const navigate = useNavigate();

  const handleChangeFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    // select oly the first uploaded file otherwise null
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    // convert file to URL
    setImage(URL.createObjectURL(file));
  };
  return (
    <div className="flex flex-row items-center justify-center h-screen ">
      <div className="p-6 rounded-xl w-1/3 border-1">
        <div className="flex flex-row justify-between">
          <p className="text-xl font-medium">Add new product</p>
          <IoClose onClick={() => navigate(-1)} size={26} />
        </div>
        <form onSubmit={onSubmit}>
          <div>
            <div className="flex flex-row justify-center gap-2 items-center">
              <p className="mt-4">Name:</p>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4 "
              />
            </div>
            <div className="flex flex-row justify-center gap-2 items-center">
              <p className="mt-4">Description:</p>
              <input
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4"
              />
            </div>
            <div className="flex flex-row justify-center gap-2 items-center">
              <p className="mt-4">Price:</p>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4"
              />
            </div>
            <div className="flex flex-row justify-center gap-2 items-center">
              <p className="mt-4">Image:</p>
              <div>
                <input
                  required
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.value);
                    handleChangeFile(e);
                  }}
                  placeholder="Image URL"
                  className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4"
                  accept="image/*"
                />
                <img src={image} alt="" />
              </div>
            </div>
          </div>

          <div className="my-4 flex flex-row justify-center gap-x-4">
            <button
              type="submit"
              className="bg-yellow-300 py-1 px-10 rounded-lg "
            >
              {editingId !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

import type { ProductI } from "../types/ProductI";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useProduct } from "../contexts/useProduct";
import { useEffect } from "react";

import { Controller, useForm, type SubmitHandler } from "react-hook-form";

interface formFields {
  product: ProductI;
}

const ProductForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formFields>();
  const { id } = useParams();
  const { products, updateProduct, createProduct } = useProduct();

  const editingProduct = id
    ? products.find((p) => p.id.toString() === id)
    : null;
  // console.log("editingProduct", editingProduct);
  const onSubmit: SubmitHandler<formFields> = (data) => {
    // console.log("Data", data);
    const newProduct: ProductI = {
      id: editingProduct?.id ?? uuidv4(),
      name: data.product.name,
      description: data.product.description,
      image: data.product.image,
      price: data.product.price,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, newProduct);
    } else {
      createProduct(newProduct);
    }

    navigate(-1);
  };

  const navigate = useNavigate();

  // effect runs whenever editingProduct changes.
  useEffect(() => {
    // console.log("useEffect is running", editingProduct);
    if (editingProduct) {
      setValue("product.name", editingProduct.name);
      setValue("product.description", editingProduct.description);
      setValue("product.price", editingProduct.price);
      setValue("product.image", editingProduct.image);
    }
  }, [editingProduct]);

  return (
    <div className="flex flex-row items-center justify-center h-screen ">
      <div className="p-6 rounded-xl w-1/3 border-1">
        <div className="flex flex-row justify-between mb-4">
          <p className="text-xl font-medium">
            {editingProduct !== null ? "Update Product" : "Add New Product"}
          </p>
          <IoClose onClick={() => navigate(-1)} size={26} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="product.name"
            control={control}
            rules={{
              required: "* Name is required",
              maxLength: {
                value: 20,
                message: "Name cannot exceed 10 characters",
              },
            }}
            render={({ field }) => (
              <div className="flex flex-col justify-center ">
                <div className="flex flex-row  gap-2">
                  <p className="mt-4">Name:</p>
                  <input
                    type="text"
                    {...field}
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4 "
                  />
                </div>
                {errors.product?.name && (
                  <p className="text-red-400 font-extralight text-sm">
                    {errors.product.name.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="product.description"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col justify-center ">
                <div className="flex flex-row gap-2 ">
                  <p className="mt-4">Description:</p>
                  <input
                    type="text"
                    {...field}
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4"
                  />
                </div>
              </div>
            )}
          />
          <Controller
            name="product.price"
            control={control}
            rules={{
              required: "* Price is required",
              maxLength: {
                value: 10,
                message: "Price cannot exceed 10 characters",
              },
            }}
            render={({ field }) => (
              <div className="flex flex-col justify-center ">
                <div className="flex flex-row gap-2 items-center">
                  <p className="mt-4">Price:</p>
                  <input
                    type="number"
                    // required
                    // value={price}
                    // onChange={(e) => setPrice(Number(e.target.value))}
                    {...field}
                    placeholder="Price"
                    className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4"
                  />
                </div>
                {errors.product?.name && (
                  <p className="text-red-400 font-extralight text-sm">
                    {errors.product.price?.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="product.image"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col justify-center ">
                <div className="flex flex-row gap-2">
                  <p className="mt-4">Image:</p>
                  <div>
                    <input
                      type="file"
                      // {...field}
                      className="border-1 border-slate-300 py-1 px-2 rounded-lg mt-4"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) {
                          return;
                        }
                        const url = URL.createObjectURL(file);
                        field.onChange(url);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          />
          <div className="my-4 flex flex-row justify-center gap-x-4">
            <button
              type="submit"
              className="bg-yellow-300 py-1 px-10 rounded-lg "
            >
              {editingProduct !== null ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

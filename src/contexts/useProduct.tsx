import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ProductI } from "../types/ProductI";

interface ProductContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  createProduct: (products: ProductI) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: ProductI) => void;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  price: string | number;
  setPrice: React.Dispatch<React.SetStateAction<string | number>>;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
  searchProduct: ProductI[];
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  createProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
  name: "",
  setName: () => {},
  description: "",
  setDescription: () => {},
  image: "",
  setImage: () => {},
  price: 0,
  setPrice: () => {},
  editingId: null,
  setEditingId: () => {},
  searchProduct: [],
  search: "",
  setSearch: () => {},
});
// const ProductContext = createContext<ProductContextType | undefined>(undefined);
// if (ProductContext === undefined) {
//   throw new Error(" Error from product contex");
// }
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  // console.log("editing ID", editingId);
  const createProduct = (product: ProductI) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const updateProduct = (id: string, updated: ProductI) => {
    setProducts((prev) =>
      prev.map((product) => (product.id === id ? updated : product))
    );
  };

  const searchProduct = products.filter((p) =>
    p.name.toLowerCase().includes(search)
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        name,
        setName,
        description,
        setDescription,
        image,
        setImage,
        price,
        setPrice,
        editingId,
        setEditingId,
        searchProduct,
        search,
        setSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

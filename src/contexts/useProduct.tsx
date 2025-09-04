import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ProductI } from "../types/ProductI";

interface ProductContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  createProduct: (products: ProductI) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: ProductI) => void;
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
  searchProduct: [],
  search: "",
  setSearch: () => {},
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [search, setSearch] = useState("");

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

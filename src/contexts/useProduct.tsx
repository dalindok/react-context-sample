import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ProductI } from "../types/ProductI";
import { useSearchParams } from "react-router-dom";

interface ProductContextType {
  products: ProductI[];
  setProducts: React.Dispatch<React.SetStateAction<ProductI[]>>;
  createProduct: (products: ProductI) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: ProductI) => void;
  searchProduct: ProductI[];
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
  createProduct: () => {},
  deleteProduct: () => {},
  updateProduct: () => {},
  searchProduct: [],
});

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [products, setProducts] = useState<ProductI[]>([]);
  const [products, setProducts] = useState<ProductI[]>(() => {
    // Converts a JSON string back into a JavaScript object/array.
    const stored = localStorage.getItem("products");
    //  const stored = sessionStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    // add a key and a value to localStorage.
    localStorage.setItem("products", JSON.stringify(products));
    // sessionStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // useEffect(() => {
  //   const stored = localStorage.getItem("products");
  //   console.log("stored", stored);
  //   if (stored) {
  //     setProducts(JSON.parse(stored));
  //   }
  // }, []);

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

  const [searchParam] = useSearchParams();
  const getSearchParams = searchParam.get("search") || "";

  const searchProduct = products.filter((p) =>
    p.name.toLowerCase().includes(getSearchParams)
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);

import { ProductItem } from "./ProductItem";
import { useProduct } from "../contexts/useProduct";
import type { ProductI } from "../types/ProductI";

export const ListProduct = () => {
  const { searchProduct } = useProduct();
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {/* check if the search key has no data match */}
        {searchProduct.length === 0 ? (
          <p>No products found.</p>
        ) : (
          searchProduct.map((p: ProductI) => (
            <ProductItem key={p.id} product={p} />
          ))
        )}
      </div>
    </div>
  );
};

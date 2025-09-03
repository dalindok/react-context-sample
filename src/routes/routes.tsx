import { Route, Routes } from "react-router-dom";
// import { ListProduct } from "../pages/ListProduct";
import ProductForm from "../components/ProductForm";
import HomePage from "../pages/HomePage";
import { ProductProvider } from "../contexts/useProduct";

const RouteNavigation = () => {
  return (
    <ProductProvider>
      <Routes>
        {/* <Route path="/" element={<ListProduct />} /> */}
        <Route path="/" element={<HomePage />} />

        <Route path="/addproduct" element={<ProductForm />} />
      </Routes>
    </ProductProvider>
  );
};

export default RouteNavigation;

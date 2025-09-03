import { Route, Routes } from "react-router-dom";
// import { ListProduct } from "../pages/ListProduct";
import ProductForm from "../components/ProductForm";
import HomePage from "../pages/HomePage";

const RouteNavigation = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<ListProduct />} /> */}
      <Route path="/" element={<HomePage />} />

      <Route path="/addproduct" element={<ProductForm />} />
    </Routes>
  );
};

export default RouteNavigation;

import "./App.css";
import { ProductProvider } from "./contexts/useProduct";
import RouteNavigation from "./routes/routes";
// import ProductForm from "./components/ProductForm";
// import { ProductProvider } from "./contexts/useProduct";
// import { ListProduct } from "./pages/ListProduct";

function App() {
  return (
    <ProductProvider>
      <RouteNavigation />
    </ProductProvider>
  );
}

export default App;

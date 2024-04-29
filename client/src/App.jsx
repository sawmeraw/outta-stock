import {
  Navbar,
  Footer,
  PurchaseOrders,
  CreatePO,
  ReceivePO,
} from "./components";
import {
  Products,
  Management,
  PO,
  About,
  Inventory,
  EditProduct,
  DeletedProducts,
  CreateProduct,
  Analytics,
} from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./input.css";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/products" index element={<Products />} />
              <Route path="/management" element={<Management />} />
              <Route path="/po" element={<PO />}>
                <Route path="orders" index element={<PurchaseOrders />} />
                <Route path="create" element={<CreatePO />} />
                <Route path="receive" element={<ReceivePO />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/inventory/:id" element={<Inventory />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
              <Route path="/deleted-products" element={<DeletedProducts />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;

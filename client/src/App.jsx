import {
  Navbar,
  Footer,
  PurchaseOrders,
  CreatePO,
  ReceivePO,
  Invoices,
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./input.css";
import Supplier from "./pages/Supplier";

function App() {
  return (
    <>
      <Router>
        <div className="flex flex-col min-h-screen">
          <ToastContainer position="top-center" />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route exact path="/" index element={<Products />} />
              <Route exact path="/products" index element={<Products />} />
              <Route path="/management" element={<Management />} />
              <Route path="/po" element={<PO />}>
                <Route index element={<PurchaseOrders />} />
                <Route path="create" element={<CreatePO />} />
                <Route path="receive" element={<ReceivePO />} />
                <Route path="invoices" element={<Invoices />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/inventory/:id" element={<Inventory />} />
              <Route path="/editproduct/:id" element={<EditProduct />} />
              <Route path="/deleted-products" element={<DeletedProducts />} />
              <Route path="/manage-suppliers" element={<Supplier />} />
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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import CustomerRegister from "./pages/customer_Register";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/customerDashboard"
import CustomerLogin from "./pages/customer_Login";
import CustomerMenu from "./pages/CustomerMenu";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Payment from "./pages/Payment";
import AdminOrders from "./pages/AdminOrders";
import AdminMenu from "./pages/AdminMenu";
import AdminTables from "./pages/AdminTables";
import AdminPayments from "./pages/AdminPayments";
import AdminCustomers from "./pages/AdminCustomers";
import AdminReports from "./pages/AdminReports";
import CafeHome from "./pages/CafeHome";
import CustomerProfile from "./pages/CustomerProfile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-menu" element={<CustomerMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/tables" element={<AdminTables />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/cafe" element={<CafeHome />} />
        <Route
  path="/customer-profile"
  element={<CustomerProfile />}
/>

        <Route
          path="/admin/customers"
          element={<AdminCustomers />}
        />

        <Route
          path="/admin/reports"
          element={<AdminReports />}
        />

        <Route
          path="/customer-register"
          element={<CustomerRegister />}
        />

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
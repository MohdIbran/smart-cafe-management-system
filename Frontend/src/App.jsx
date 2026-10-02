import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/Register";
import CustomerRegister from "./pages/customer_Register";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/customerDashboard";
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
        {/* Main Home Page */}
        <Route path="/" element={<CafeHome />} />

        {/* Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/tables" element={<AdminTables />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/reports" element={<AdminReports />} />

        {/* Customer */}
        <Route
          path="/customer-dashboard"
          element={<CustomerDashboard />}
        />

        <Route
          path="/customer-register"
          element={<CustomerRegister />}
        />

        <Route
          path="/customer-login"
          element={<CustomerLogin />}
        />

        <Route
          path="/customer-menu"
          element={<CustomerMenu />}
        />

        <Route
          path="/customer-profile"
          element={<CustomerProfile />}
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/payment" element={<Payment />} />

        {/* Cafe Home */}
        <Route path="/cafe" element={<CafeHome />} />

        {/* Admin Login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


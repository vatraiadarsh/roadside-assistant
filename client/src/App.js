import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/App/Footer";
import Header from "./components/App/Header";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Profile from "./pages/ProfilePage";
import ManageUsers from "./pages/Admin/ManageUsers";
import ServiceRequestPage from "./pages/ServiceRequestPage";
import RequestedServices from "./pages/RequestedServices";
import EditProfile from "./components/Profile/EditProfile";
import RequestedService from "./components/Profile/RequestedService";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/request-service" element={<ServiceRequestPage />} />
          <Route path="/requested-services" element={<RequestedServices />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;

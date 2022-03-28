import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/App/Footer";
import Header from "./components/App/Header";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home";
import Login from "../pages/login/login";
import Register from "../pages/register/register";

export const useRoutes = () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    return (
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="login" element={<Login></Login>} />
      <Route path="register" element={<Register></Register>} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
};

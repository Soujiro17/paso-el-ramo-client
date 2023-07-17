/* eslint-disable react/prop-types */
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Inicio from "../pages/Inicio";
import useAuth from "../hooks/useAuth";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<p>Not Found</p>} />
        <Route path="/dashboard" element={<RequireAuth>test</RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();

  const location = useLocation();

  if (!auth) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AppRoutes;

import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const location = useLocation();

    if (!token) {
        return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
    }

    return children;
};

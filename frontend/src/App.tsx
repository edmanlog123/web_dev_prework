import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import AuthBox from "./components/AuthBox";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const { data, loading } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  return (
    <Routes>
      {/* Public Route - AuthBox with login/signup toggle */}
      <Route
        path="/login"
        element={data?.authUser ? <Navigate to="/" /> : <AuthBox />}
      />

      {/* Protected Route - Homepage */}
      <Route
        path="/"
        element={data?.authUser ? <Homepage /> : <Navigate to="/login" />}
      />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

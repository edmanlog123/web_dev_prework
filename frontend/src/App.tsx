import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import AuthBox from "./components/AuthBox";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import AddCreatorpage from "./pages/AddCreatorpage";
import Creatorspage from "./pages/Creatorspage";
import Settingspage from "./pages/Settingspage";

export default function App() {
  const { data, loading } = useQuery(GET_AUTHENTICATED_USER);

  if (loading) return null;

  return (
    <>
    <Routes>
      {/* Public Route - AuthBox with login/signup toggle */}
      <Route
        path="/login"
        element={data?.authUser ? <Navigate to="/" /> : <AuthBox />}
      />

      {/* Protected Route - Homepage */}
      <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={data?.authUser ? <Homepage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/add"
                  element={data?.authUser ? <AddCreatorpage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/creators"
                  element={data?.authUser ? <Creatorspage /> : <Navigate to="/login" />}
                />
                <Route
                  path="/settings"
                  element={data?.authUser ? <Settingspage /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          }
          />
    </Routes>
    <Toaster/>
    </>
  );
}

import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { Routes, Navigate, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx"
import { useSelector } from "react-redux";

function App() {

  const {authUser} = useSelector((store)=>store.userStore);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
         <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;

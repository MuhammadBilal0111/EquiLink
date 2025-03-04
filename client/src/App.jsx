import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { Routes, Navigate, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx"

function App() {

  const authUser = { name: "ahad" };
  

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
        
        {/* <Route
          path="/signUp"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </>
  );
}

export default App;

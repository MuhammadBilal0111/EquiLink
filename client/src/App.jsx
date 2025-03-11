import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LandingPage from "./pages/LandingPage.jsx"
import Profile from "./components/Profile.jsx";
import { Routes, Navigate, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx"
import { useSelector } from "react-redux";
import AddPitchPage from "./pages/AddPitchPage";

function App() {

  const {authUser} = useSelector((store)=>store.userStore);

  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <LandingPage/> : <Navigate to="/home"/>}/>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />}/>
        <Route path="/home" element={!authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path="/profile" element={!authUser ? <Profile/> : <Navigate to="/profile" />}/>
        <Route path="/addpitch" element={!authUser ? <AddPitchPage/> : <Navigate to="/addpitch" />}/>

      </Routes>
    </>
  );
}

export default App;

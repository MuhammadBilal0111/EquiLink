import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LandingPage from "./pages/LandingPage.jsx"
import Profile from "./components/Profile.jsx";
import { Routes, Navigate, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx"
import { axiosInstance } from "./lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileActions, userActions } from "./store";

function App() {

  
  const {authUser} = useSelector((store)=>store.userStore);
  console.log("from app",authUser)


  const dispatch = useDispatch()

  const checkAuth = async ()=>{
      try{
        const res = await axiosInstance.get("/auth/check-auth");
        dispatch(userActions.setUser(res.data.data))
    }
    catch(err){
        console.log("error in checkAuth:", err)              
    }
  }

  useEffect(()=>{
    checkAuth()
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={!authUser ? <LandingPage/> : <Navigate to="/home"/>}/>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />}/>
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />}/>
      </Routes>
    </>
  );
}

export default App;

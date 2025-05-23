import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LandingPage from "./pages/LandingPage.jsx"
import { Routes, Navigate, Route } from "react-router";
import HomePage from "./pages/HomePage.jsx"
import { axiosInstance } from "./lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { profileActions, userActions } from "./store";
import AddPitch from "./Components/AddPitch";
import Pitch from "./pages/Pitch";
import InvestorPitch from "./pages/InvestorPitch"
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import PitchesPage from "./pages/PitchesPage";



function App() {

  
  const {authUser} = useSelector((store)=>store.userStore);
  const user = localStorage.getItem("user")

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
        <Route path="/" element={!authUser ? <LandingPage/> : <HomePage/>}/>
        <Route path="/signup" element={(!authUser || !user) ? <SignupPage /> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path="/add-pitch" element={(authUser || user) ? <AddPitch /> : <Navigate to="/login" />}/>
        <Route path="/admin-dashboard" element={<DashboardPage/>} />
        <Route path="/admin-users" element={<UsersPage/>} />
        <Route path="/admin-pitches" element={<PitchesPage/>} />
        <Route path="/pitch/:id" element={authUser ? (authUser.user?.role === "Entrepreneur" ? <Pitch /> : <InvestorPitch />
          ) : (<Navigate to="/login" />)}
/>
      </Routes>
    </>
  );
}

export default App;

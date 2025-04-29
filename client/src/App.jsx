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
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";



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
      <SendbirdProvider       
      appId={import.meta.env.VITE_SENDBIRD_APP_ID} 
      userId={authUser?.user?.id} >
      <Routes>
        <Route path="/" element={!authUser ? <LandingPage/> : <HomePage/>}/>
        <Route path="/signup" element={(!authUser || !user) ? <SignupPage /> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path="/add-pitch" element={(authUser || user) ? <AddPitch /> : <Navigate to="/login" />}/>
        <Route path="/pitch/:id" element={authUser ? (authUser.user?.role === "Entrepreneur" ? <Pitch /> : <InvestorPitch />
          ) : (<Navigate to="/login" />)}
/>

      </Routes>
      </SendbirdProvider>
    </>
  );
}

export default App;

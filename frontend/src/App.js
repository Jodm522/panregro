import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from './components/homepage'
import Navigation from './components/navigation'
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import './App.css';

function App() {

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return  (
   <>
   <Navigation />
   <BrowserRouter>
   <Routes>
    <Route path ="/" element={<Home />}/>
    <Route path="/login" element={<LoginFormPage />}/>
    <Route path="/signup" element={<SignupFormPage />}/>
 </Routes>
   </BrowserRouter>
  
   </>
  );
}

export default App;

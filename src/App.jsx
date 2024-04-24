import { useState } from 'react'
import Ide from './components/Ide'
import Home from './components/Home'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { UserAuth } from './context/UserAuth';
function App() {

  const {currentuser} = UserAuth()
  console.log(currentuser);
  const ProtectedRoute = ({children}) =>{
    if(!currentuser){
      return <Navigate to="/login"/>
    }
 
    return children
  }

  return (
    <BrowserRouter>
    <Routes>
      <Route >
        <Route index element={<ProtectedRoute>
        <Home />
        </ProtectedRoute>} /> 
        <Route path="/ide" element={<Ide />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App

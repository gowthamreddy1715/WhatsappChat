import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";         
import Register from "./Register";
import Login from "./Login";
import OrderForm from "./OrderForm";   
import ViewOrders from "./viewOrders"; 
import "./styles.css";                 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<OrderForm />} />
        <Route path="/view" element={<ViewOrders />} />
      </Routes>
    </Router>
  );
}

export default App;

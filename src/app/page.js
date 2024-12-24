'use client'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../app/login/page";
import Admin from "../app/admin/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

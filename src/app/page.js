'use client'
import React from 'react';
import dynamic from 'next/dynamic';

const BrowserRouter = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), {
  ssr: false,
});

import { Routes, Route } from 'react-router-dom';
import Login from "../app/login/page";
import Admin from "../app/admin/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

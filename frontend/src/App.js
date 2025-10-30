import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Builder from "./pages/Builder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/builder" replace />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

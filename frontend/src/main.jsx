import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import DeletePage from "./pages/DeletePage";
import ChartPage from "./pages/ChartPage";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEdit />} />
        <Route path="/:id/edit" element={<AddEdit />} />
        <Route path="/:id/delete" element={<DeletePage />} />
        <Route path="/chart" element={<ChartPage />} /> {/* Bonus */}
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);

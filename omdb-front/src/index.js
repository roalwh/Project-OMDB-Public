import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import App from "./App";
import ScrollTop from "./components/ScrollTop";
import { BrowserRouter } from "react-router-dom";
// import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <CookiesProvider>
  <BrowserRouter>
    <ScrollTop />
    <Routes>
      <Route path="*" element={<App />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  </BrowserRouter>
  // </CookiesProvider>
);

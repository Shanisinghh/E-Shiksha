import { useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "./costumHools/getCurrentUser";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  getCurrentUser();
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={1700}
        theme="light"
        className=""
      />
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

import { MainPage } from "./pages/MainPage.jsx";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import { LoginForm } from "./components/LoginForm/LoginForm.jsx";
import { RequestPage } from "./pages/RequestPage.jsx";
import { useState } from "react";


export const App = () => {
  const [isOpen, setIsOpen] = useState({calculator: false, filters: false, addRequest: false});
  return (
    <>
      <Header setIsOpen={setIsOpen} isOpen={isOpen} />
      <main className="mainContainer">
        
        <Routes>
          <Route path="/" element={<MainPage isOpen={isOpen} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/request/:id" element={<RequestPage />} />
        </Routes>
      </main>
    </>
  );
};

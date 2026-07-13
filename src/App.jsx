import { MainPage } from "./pages/MainPage.jsx";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import { LoginForm } from "./components/LoginForm/LoginForm.jsx";
import {RequestPage} from "./pages/RequestPage.jsx";


export const App = () => {
  

  return (
    <main className="mainContainer">
      <Header />

      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/request/:id" element={<RequestPage/>}/>
      </Routes>
    </main>
  );
};
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Homepage from "./pages/Homepage";
import Doctor from "./pages/doctor.jsx";
import Newanalysis from "./pages/newanalysis";
import Patientrecord from "./pages/patientrecord";
import Report from "./reportcomponent/report";
 import  Chatbot1 from "./pages/chatbot"
import Auth from "./pages/auth";
import { Provider } from 'react-redux';
import ProtectedRoute from "./protectedroutes/Protectedroute.jsx";
import Authlogin from "./pages/Authlogin.jsx";
import App from "./App.jsx";
import { store } from "./store/store";
import ResetPassword from "./pages/ResetPassword.jsx";
import NearHospital from "./nearhospital/Nearhospital";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
     <Provider store={store}>
      <App/>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
         <Route path="/report/:patientId" element={<Report />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/newanalysis" element={<Newanalysis />} />
        <Route path="/Patients" element={<Patientrecord />} />
        <Route path="/Chatbot" element={<Chatbot1 />} />
        <Route path="/AuthCard" element={<Auth />} />
       <Route path="/AuthPage" element={<Authlogin />} />
       <Route path="/reset-password" element={<ResetPassword />} />
       <Route path="/nearhospitals" element={<NearHospital />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
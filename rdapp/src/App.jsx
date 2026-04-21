import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import DashPage from "./DashPage";
import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import Passbook from "./Passbook";
import SignPage from "./SignPage";
import UsPage from "./UsPage";
import PosTables from "./PosTables";

export default function App() {

  return (

    <Router>

      <Routes>

        {/* ---------------- LOGIN PAGE ---------------- */}
        {/* Default page when application starts */}
        <Route path="/" element={<LoginPage />} />

        {/* ---------------- SIGNUP PAGE ---------------- */}
        <Route path="/signup" element={<SignPage />} />



        {/* ================= ADMIN ROUTES ================= */}
        {/* DashPage is the ADMIN dashboard layout (sidebar/navbar etc.) */}
        <Route path="/admin" element={<DashPage />}>

          {/* Default admin page after admin login */}
          <Route index element={<AdminPage />} />

          {/* Admin → RD Users list */}
          <Route path="rduser" element={<UsPage />} />

          {/* Admin → View particular user */}
          <Route path="rdusers" element={<UserPage />} />

          {/* Admin → Passbook */}
          <Route path="passbook" element={<Passbook />} />

          {/* Admin → Transaction history */}
          <Route path="history" element={<PosTables />} />

        </Route>



        {/* ================= USER ROUTES ================= */}
        {/* User dashboard outside admin panel */}
        {/* When user logs in with Aadhar → navigate("/user") */}
        <Route path="/user" element={<UsPage />} />

      </Routes>

    </Router>

  );
}
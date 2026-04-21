import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Rduser from "./Rduser";
import AdminDashboard from "./AdminDashboard";
import Login from "./Login";
import UserPage from "./UserPage";
import SignupPage from "./SignupPage"
import Passbook from "./Passbook";
import History from "./History";
import Home from "./Home";
import Sup from "./Sup";
import AdminDash from "./DashPage";

export default function AppOld() {

  return (
    <Router>

      <Routes>


<Route path="/admin" element={<AdminDashboard />}>

  <Route index element={<DashboardPage />} />

  <Route path="rduser" element={<Rduser />} />

  <Route path="user" element={<UserPage />} />

  <Route path="passbook" element={<Passbook />} />

  <Route path="history" element={<History />} />

</Route>



        {/* Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Sup />} />

        {/* Admin Dashboard Layout */}
      
        <Route path="/admin" element={<AdminDashboard />}>
      

         {/* <Route
  index
  element={
    <>
      <h3>Welcome Admin</h3>
      <Rduser />
    </>
  }
/> */}
            <Route path="/admin" element={<AdminDashboard />}></Route>
          <Route path="rduser" element={<Rduser />} />

          <Route path="user" element={<UserPage />} />

          <Route path="passbook" element={<Passbook />} />

          <Route path="history" element={<History />} />

        </Route>

      </Routes>

    </Router>
  );
}


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
import DashPage from "./DashPage";

export default function App() {

  return (
    <Router>

      <Routes>


<Route path="/" element={<Login />}></Route>
{/* <Route path="/signup" element={<Sup />} /> */}
<Route path="/admin" element={<AdminDashboard />}>

  <Route index element={<Home />} />

  <Route path="rduser" element={<Rduser />} />

  <Route path="user" element={<UserPage />} />

  <Route path="passbook" element={<Passbook />} />

  <Route path="history" element={<History />} />

</Route>

      </Routes>

    </Router>
  );
}


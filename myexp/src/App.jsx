import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Dash from "./Dash";
import Login from "./Login";
import { UserContext } from "./UserContext";

function App() {
  const [Conuser, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ Conuser, setUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
               path="/dash"
               element={Conuser ? <Dash /> : <Login />}
                />
          {/* <Route path="/dash" element={<Dash />} /> */}
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
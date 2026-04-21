
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import SignIn from './SignIn';
import Dash2 from './Dash2';
import { UserContext } from "./UserContext";
import { useState } from 'react';
function App() {
   const [Conuser, setUser] = useState(null);

  return (
    <>
    <UserContext.Provider  value={{ Conuser, setUser }}>

   <Router>
     
      <Routes>
       
        <Route path="/" element={<SignIn />} />
         <Route path='dash' element={<Dash2/>}/> 
        {/* <Route path="/dash" element={<Dash/ >} /> */}
       
      </Routes>
    </Router>

    </UserContext.Provider>
      
    </>
  )
}

export default App
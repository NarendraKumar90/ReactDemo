import About from './About.jsx';
import Contact from './Contact.jsx';
import Home from './Home.jsx';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation,Navigate } from 'react-router-dom';
import Service from './Service.jsx';
import Api from './Api.jsx';
import NavScroll from './Navscroll.jsx';
import Login from './Login.jsx';


 // ProtectedRoute componentrd
function ProtectedRoute({ isLoggedIn, children }) {
   return isLoggedIn ? children : <Navigate to="/" replace />;
 }


export default function App() {

 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <>
     <Router>
      <NavScroll /> {/* Always render Navbar component */}
      <Routes>


  <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
      
       <Route path="/home" element={  <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home />   </ProtectedRoute> } />   
      <Route path="/about" element={  <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />   </ProtectedRoute> } />
       <Route path="/contact" element={  <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Contact/>   </ProtectedRoute> } />
       <Route path="/ser" element={  <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Service />   </ProtectedRoute> } />
       <Route path="/api" element={  <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Api />   </ProtectedRoute> } />








       {/* <Route path="/" element={<Login/>} />  
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="/ser" element={<Service />} />
       <Route path="/api" element={<Api />} />  */}


      </Routes>
    </Router>

    </>
  )
}
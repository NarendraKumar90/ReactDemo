
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Login from './Login';
import Dash from './Dash';
function App() {
  
  return (
    <>
      <Router>
     
      <Routes>
      
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dash/ >} />
       
      </Routes>
    </Router>

      
    </>
  )
}

export default App
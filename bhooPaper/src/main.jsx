import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.jsx'
import LoginOTP from './LoginOTP.jsx'
import OTPLogin from './OTPLogin.jsx'
import Portfolio from './Portfolio.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

 <Portfolio/>

  </StrictMode>,
)

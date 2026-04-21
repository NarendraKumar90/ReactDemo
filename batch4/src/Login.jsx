import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login({ setIsLoggedIn }) {
  const [mob, setMob] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setMob(e.target.value);
    if (error) setError(false); // Clear error when typing
  };

  const handleLogin = () => {
    if (mob === "9027080827") {
      setIsLoggedIn(true);
      navigate('/home');
    } else {
      setError(true);
      // Optional: Auto-clear error after 3 seconds
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <div className="login-viewport">
      <div className="bg-decoration"></div>
      
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card shadow-sm"
        >
          {/* Header Section */}
          <div className="text-center mb-5">
            <div className="login-logo-box mb-3">
              <ShieldCheck size={32} color="#4f46e5" strokeWidth={2.5} />
            </div>
            <h3 className="fw-bold tracking-tight m-0">Welcome Back</h3>
            <p className="text-muted small">Please sign in to continue to GeoMeasure</p>
          </div>

          {/* Form Section */}
          <div className="login-form">
            <div className={`input-wrapper-styled ${error ? 'is-invalid-shake' : ''}`}>
              <label className="input-label-top">Mobile Number</label>
              <div className="d-flex align-items-center px-3">
                <Phone size={18} className="text-muted me-2" />
                <input
                  type="number"
                  className="login-field"
                  value={mob}
                  onChange={handleInputChange}
                  placeholder="Enter registered number"
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="error-toast"
                >
                  <AlertCircle size={14} />
                  <span>Invalid mobile number. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="login-btn-pro mt-4" 
              onClick={handleLogin}
            >
              <span>Secure Login</span>
              <ArrowRight size={18} />
            </motion.button>
          </div>

          <div className="login-footer text-center mt-5">
            <p className="small text-muted m-0">Authorized Personnel Only</p>
            <span className="footer-line"></span>
          </div>
        </motion.div>
      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .login-viewport {
          background-color: #fcfdfe;
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .bg-decoration {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% -20%, #eff2ff 0%, transparent 50%);
          z-index: 0;
        }

        .login-card {
          background: white;
          padding: 40px;
          border-radius: 32px;
          width: 100%;
          max-width: 420px;
          border: 1px solid #eef2f7;
          position: relative;
          z-index: 1;
        }

        .login-logo-box {
          background: #f5f3ff;
          width: 64px;
          height: 64px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .input-wrapper-styled {
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          border-radius: 18px;
          padding: 10px 0;
          transition: all 0.3s ease;
        }

        .input-wrapper-styled:focus-within {
          border-color: #4f46e5;
          background: white;
          box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.08);
        }

        .input-label-top {
          display: block;
          font-size: 0.7rem;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 0 16px;
          margin-bottom: 2px;
        }

        .login-field {
          border: none !important;
          background: transparent !important;
          width: 100%;
          padding: 4px 0;
          font-weight: 600;
          color: #1e293b;
          outline: none;
        }

        .login-btn-pro {
          background: #4f46e5;
          color: white;
          width: 100%;
          padding: 16px;
          border-radius: 18px;
          border: none;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
          transition: 0.3s;
        }

        .login-btn-pro:hover {
          background: #4338ca;
        }

        .error-toast {
          background: #fff1f2;
          color: #e11d48;
          padding: 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-top: 15px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .is-invalid-shake {
          animation: shake 0.5s;
          border-color: #fda4af;
        }

        .login-footer .footer-line {
          display: block;
          width: 40px;
          height: 3px;
          background: #f1f5f9;
          margin: 10px auto 0;
          border-radius: 10px;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// Minimal Container mock to replace bootstrap if not imported
function Container({ children, className }) {
  return <div className={`container ${className}`}>{children}</div>;
}
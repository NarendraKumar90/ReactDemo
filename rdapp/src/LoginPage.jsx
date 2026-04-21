import React, { useState } from "react";
import { Container, Card, Form, Button, Spinner, InputGroup } from "react-bootstrap";
import { User, Lock, ArrowRight, ShieldCheck, Fingerprint } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function LoginPage() {
  const [userAdhar, setAdhar] = useState("");
  const [userAcc, setAcc] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const log = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!userAdhar || !userAcc) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    const dt = { acno: userAcc, adharno: userAdhar };

    try {
      const res = await axios.post("http://localhost:8080/logins", dt);
      if (res.data.status === "200") {
        localStorage.setItem("user", JSON.stringify(res.data));
        const userData = res.data.data;
        
        if ('9027080827' === userData.acno && '9027080827' === userData.adharno) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        alert("Invalid Credentials!");
      }
    } catch (err) {
      alert(err.response ? "Invalid Credentials!" : "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pro-viewport">
      {/* Background Decorative Elements */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-100"
          style={{ maxWidth: "440px" }}
        >
          <Card className="pro-card shadow-2xl border-0 overflow-hidden">
            <div className="pro-accent-bar"></div>
            <Card.Body className="p-4 p-md-5">
              
              <div className="text-center mb-5">
                <div className="pro-logo-container mb-3">
                  <ShieldCheck size={40} className="text-white" />
                </div>
                <h2 className="pro-title">Welcome Back</h2>
                <p className="pro-subtitle">Enter your details to access your secure portal</p>
              </div>

              <Form onSubmit={log}>
                {/* Aadhar Field */}
                <Form.Group className="mb-4">
                  <Form.Label className="pro-label">Aadhar Number</Form.Label>
                  <InputGroup className="pro-input-group">
                    <InputGroup.Text className="pro-addon">
                      <Fingerprint size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="0000 0000 0000"
                      onChange={(e) => setAdhar(e.target.value)}
                      className="pro-input"
                    />
                  </InputGroup>
                </Form.Group>

                {/* Account Field */}
                <Form.Group className="mb-4">
                  <Form.Label className="pro-label">Account Number</Form.Label>
                  <InputGroup className="pro-input-group">
                    <InputGroup.Text className="pro-addon">
                      <User size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Enter Account No."
                      onChange={(e) => setAcc(e.target.value)}
                      className="pro-input"
                    />
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="pro-btn w-100 d-flex align-items-center justify-content-center gap-2 mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <>
                      AUTHENTICATE <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </Form>

              <div className="text-center mt-5">
                <span className="pro-footer-text">Don't have an account? </span>
                <Link to="/signup" className="pro-signup-link">
                  Create Account
                </Link>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .pro-viewport {
          background-color: #0f172a;
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Decorative Background Orbs */
        .orb {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.4;
        }
        .orb-1 { background: #4f46e5; top: -100px; left: -100px; }
        .orb-2 { background: #9333ea; bottom: -100px; right: -100px; }

        /* Card Styling */
        .pro-card {
          background: rgba(30, 41, 59, 0.7) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 28px !important;
          position: relative;
          z-index: 1;
        }

        .pro-accent-bar {
          height: 6px;
          background: linear-gradient(90deg, #4f46e5, #9333ea);
          width: 100%;
        }

        .pro-logo-container {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, #4f46e5, #9333ea);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        .pro-title {
          color: #ffffff;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .pro-subtitle {
          color: #94a3b8;
          font-size: 0.95rem;
        }

        /* Input Styling */
        .pro-label {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 0.85rem;
          margin-bottom: 8px;
          margin-left: 4px;
        }

        .pro-input-group {
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          transition: 0.3s;
          overflow: hidden;
        }

        .pro-input-group:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .pro-addon {
          background: transparent !important;
          border: none !important;
          color: #6366f1 !important;
          padding-left: 15px;
        }

        .pro-input {
          background: transparent !important;
          border: none !important;
          color: white !important;
          padding: 12px 15px !important;
          font-weight: 500;
        }

        .pro-input::placeholder {
          color: #475569;
        }

        .pro-input:focus {
          box-shadow: none !important;
        }

        /* Remove Arrows from Number Input */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Button Styling */
        .pro-btn {
          background: linear-gradient(90deg, #4f46e5, #7c3aed) !important;
          border: none !important;
          padding: 14px !important;
          border-radius: 14px !important;
          font-weight: 700 !important;
          letter-spacing: 0.5px;
          transition: 0.4s !important;
          box-shadow: 0 8px 15px rgba(79, 70, 229, 0.3);
        }

        .pro-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(79, 70, 229, 0.4);
          filter: brightness(1.1);
        }

        /* Footer */
        .pro-footer-text {
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .pro-signup-link {
          color: #818cf8;
          text-decoration: none;
          font-weight: 700;
          transition: 0.2s;
        }

        .pro-signup-link:hover {
          color: #c084fc;
        }
      `}</style>
    </div>
  );
}
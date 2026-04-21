import { Container, Row, Col, Card, Form, InputGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { motion, AnimatePresence } from "framer-motion";
import { MoveUp, MoveDown, MoveLeft, MoveRight, Calculator, Map, ChevronRight, Info, LogOut } from "lucide-react";

export default function Home({ setIsLoggedIn }) { // Destructured setIsLoggedIn from props
  const [formData, setData] = useState({ N: "", S: "", E: "", W: "" });
  const [bigha, setBigha] = useState(0);
  const [ayer, setAyer] = useState(0);
  const [ttlayer, settAyer] = useState(0);
  
  const navigate = useNavigate(); // Navigation hook

  // Handle Logout/Back Navigation
  const handleBackToLogin = () => {
    if (setIsLoggedIn) setIsLoggedIn(false); // Reset login state
    navigate("/"); // Navigate to default login route
  };

  useEffect(() => {
    let { N, S, E, W } = formData;
    if (N && S && E && W) {
      let x = (Number(N) + Number(S)) / 2;
      let y = (Number(E) + Number(W)) / 2;
      let result = (x * y) / 630;
      let b = Math.floor(result);
      let a = (result - b) * 63;
      setBigha(b);
      settAyer(((x * y) / 10).toFixed(2));
      setAyer(a.toFixed(2));
    }
  }, [formData]);

  const getAre = (e) => {
    let x = e.target.value;
    if (!x) return;
    let result = x / 63;
    let b = Math.floor(result);
    setBigha(b);
    let a = (result - b) * 63;
    setAyer(a.toFixed(2));
    settAyer(x);
  };

  const handl = (e) => {
    const { name, value } = e.target;
    setData({ ...formData, [name]: value });
  };

  return (
    <div className="light-pro-viewport">
      <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pro-container"
        >
          {/* Top Branding Section with Back/Logout Button */}
          <div className="pro-header d-flex align-items-center justify-content-between p-4">
            <div className="d-flex align-items-center gap-3">
              <div className="pro-icon-box">
                <Map size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="fw-bold m-0 tracking-tight">जमीन मापन(GeoMeasure)</h4>
                <div className="d-flex align-items-center gap-1">
                  <span className="dot"></span>
                  <span className="text-muted small fw-medium">Live Calculator</span>
                </div>
              </div>
            </div>
            
            {/* Added: Ultra Pro Logout Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBackToLogin}
              className="back-btn-pro"
            >
              <LogOut size={16} />
              <span className="d-none d-sm-inline">Logout</span>
            </motion.button>
          </div>

          <div className="p-4 p-md-5 pt-0">
            {/* High-Impact Result Card */}
            <div className="main-result-card shadow-sm border mb-5">
              <Row className="g-0">
                <Col xs={7} className="p-4">
                  <span className="text-muted small fw-bold text-uppercase ls-1">कुल बीघा</span>
                  <AnimatePresence mode="wait">
                    <motion.h1 
                      key={bigha}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="display-4 fw-black text-indigo m-0"
                    >
                      {bigha} <span className="fs-2 text-dark">बीघा</span>
                    </motion.h1>
                  </AnimatePresence>
                  <div className="mt-2 d-flex align-items-center gap-2">
                    <span className="total-badge">{ttlayer} Total Ayer</span>
                  </div>
                </Col>
                <Col xs={5} className="p-4 bg-soft-indigo d-flex flex-column justify-content-center align-items-end text-end">
                  <span className="text-muted small fw-bold text-uppercase ls-1">शेष ऐयर</span>
                  <h2 className="fw-bold m-0">{ayer}</h2>
                  <ChevronRight size={18} className="text-indigo mt-1" />
                </Col>
              </Row>
            </div>

            {/* Input Methodology Selection */}
            <div className="method-section mb-4">
              <div className="d-flex align-items-center gap-2 mb-3">
                <Calculator size={18} className="text-indigo" />
                <h6 className="fw-bold m-0">कुल ऐयर (Measurements)</h6>
              </div>

              {/* Direct Ayer Input */}
              <div className="pro-input-group-styled mb-4">
                <Form.Control
                  onChange={getAre}
                  placeholder="Total Ayer..."
                  type="number"
                  className="pro-field-entry"
                />
              </div>

              {/* Grid Inputs */}
              <Row className="g-3">
                {[
                  { label: "Uttar", hindi: "उत्तर", name: "N", icon: <MoveUp size={14}/> },
                  { label: "Dakshin", hindi: "दक्षिण", name: "S", icon: <MoveDown size={14}/> },
                  { label: "Purab", hindi: "पूर्व", name: "E", icon: <MoveRight size={14}/> },
                  { label: "Paschim", hindi: "पश्चिम", name: "W", icon: <MoveLeft size={14}/> }
                ].map((field) => (
                  <Col xs={6} key={field.name}>
                    <div className="dimension-box">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="dim-label">{field.icon} {field.label}</span>
                        <span className="dim-hindi">{field.hindi}</span>
                      </div>
                      <Form.Control
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handl}
                        placeholder="0.0 m"
                        type="number"
                        className="pro-field"
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Professional Footer */}
            <div className="pro-footer-info d-flex align-items-center gap-2 p-3 rounded-3">
              <Info size={16} className="text-indigo" />
              <span className="small text-muted fw-medium">
                Conversion factor: <strong>1 Bigha = 63 Ayer</strong>. Accuracy varies based on local standards.
              </span>
            </div>
          </div>
        </motion.div>
      </Container>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .light-pro-viewport {
          background-color: #fcfdfe;
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #1a1f36;
        }

        .pro-container {
          background: #ffffff;
          border-radius: 32px;
          width: 100%;
          max-width: 520px;
          border: 1px solid #eef2f7;
          box-shadow: 0 20px 40px rgba(0,0,0,0.03);
          overflow: hidden;
        }

        .pro-icon-box {
          background: #4f46e5;
          color: white;
          padding: 10px;
          border-radius: 14px;
          box-shadow: 0 8px 16px rgba(79, 70, 229, 0.2);
        }

        /* Added: Pro Back/Logout Button Style */
        .back-btn-pro {
          background: #fff1f2;
          color: #e11d48;
          border: 1px solid #ffe4e6;
          padding: 8px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.2s;
        }

        .back-btn-pro:hover {
          background: #ffe4e6;
          color: #be123c;
        }

        .badge-pro {
          background: #f0f4ff;
          color: #4f46e5;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }

        .dot {
          height: 6px; width: 6px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
        }

        .main-result-card {
          border-radius: 24px;
          overflow: hidden;
          background: white;
        }

        .bg-soft-indigo { background-color: #f9faff; }
        .text-indigo { color: #4f46e5; }
        .fw-black { font-weight: 800; }
        .ls-1 { letter-spacing: 1px; }

        .total-badge {
          background: #4f46e5;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 8px;
        }

        .pro-input-group-styled .pro-field-entry {
          border: 2px solid #f1f4f9 !important;
          border-radius: 16px !important;
          padding: 14px 20px !important;
          font-weight: 600;
          transition: all 0.2s;
        }

        .pro-input-group-styled .pro-field-entry:focus {
          border-color: #4f46e5 !important;
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.05) !important;
        }

        .dimension-box {
          background: #f8fafc;
          padding: 12px 16px;
          border-radius: 18px;
          border: 1px solid #f1f5f9;
        }

        .dim-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dim-hindi {
          font-size: 0.75rem;
          font-weight: 600;
          color: #4f46e5;
        }

        .pro-field {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-weight: 700 !important;
          font-size: 1.2rem !important;
          color: #1e293b !important;
        }

        .pro-field:focus { box-shadow: none !important; }

        .pro-footer-info {
          background: #f5f3ff;
          border: 1px dashed #c4b5fd;
        }

        .tracking-tight { letter-spacing: -0.5px; }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
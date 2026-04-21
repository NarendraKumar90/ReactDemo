import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Modal, InputGroup } from "react-bootstrap";
import { 
  User, Calendar, Phone, MapPin, CreditCard, ShieldCheck, 
  Briefcase, DollarSign, ArrowLeft, CheckCircle2, Info
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function SignPage() {
  const [formData, setFormData] = useState({
    name: "", gender: "", dob: "", mob: "", address: "", 
    adharno: "", panno: "", acno: "", nname: "", nadhar: "", 
    npano: "", occupation: "", rdamt: "", rddate: "", agree: 0
  });

  const [showTerms, setShowTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/usave", formData);
      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      alert("Error in registration");
    } finally {
      setLoading(false);
    }
  };

  // Helper for Section Headers
  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="section-header fade-in">
      <div className="icon-box"><Icon size={18} /></div>
      <h5>{title}</h5>
      <div className="line"></div>
    </div>
  );

  return (
    <div className="ultra-reg-wrapper">
      <div className="ambient-bg"></div>
      
      <Container className="py-5">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-reg-card shadow-lg border-0">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-5">
                <h2 className="display-6 fw-bold text-white mb-2">RD User Registration</h2>
                <p className="text-white-50">Fill in the details to create your Recurring Deposit account</p>
              </div>

              <Form>
                {/* --- Personal Section --- */}
                <SectionHeader icon={User} title="Personal Details" />
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label className="pro-label">Full Name</Form.Label>
                    <InputGroup className="pro-input-group">
                      <InputGroup.Text><User size={18} /></InputGroup.Text>
                      <Form.Control name="name" placeholder="John Doe" onChange={handleChange} className="pro-input" />
                    </InputGroup>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label className="pro-label">Gender</Form.Label>
                    <Form.Select name="gender" onChange={handleChange} className="pro-input">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                    </Form.Select>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label className="pro-label">Date of Birth</Form.Label>
                    <InputGroup className="pro-input-group">
                      <InputGroup.Text><Calendar size={18} /></InputGroup.Text>
                      <Form.Control type="date" name="dob" onChange={handleChange} className="pro-input" />
                    </InputGroup>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label className="pro-label">Mobile Number</Form.Label>
                    <InputGroup className="pro-input-group">
                      <InputGroup.Text><Phone size={18} /></InputGroup.Text>
                      <Form.Control name="mob" placeholder="+91 00000 00000" onChange={handleChange} className="pro-input" />
                    </InputGroup>
                  </Col>
                  <Col md={12} className="mb-4">
                    <Form.Label className="pro-label">Permanent Address</Form.Label>
                    <InputGroup className="pro-input-group">
                      <InputGroup.Text><MapPin size={18} /></InputGroup.Text>
                      <Form.Control as="textarea" rows={2} name="address" placeholder="Enter full address" onChange={handleChange} className="pro-input" />
                    </InputGroup>
                  </Col>
                </Row>

                {/* --- KYC Section --- */}
                <SectionHeader icon={ShieldCheck} title="KYC & Banking" />
                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label className="pro-label">Aadhar Number</Form.Label>
                    <Form.Control name="adharno" placeholder="0000 0000 0000" onChange={handleChange} className="pro-input" />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label className="pro-label">PAN Number</Form.Label>
                    <Form.Control name="panno" placeholder="ABCDE1234F" onChange={handleChange} className="pro-input" />
                  </Col>
                  <Col md={4} className="mb-4">
                    <Form.Label className="pro-label">Account Number</Form.Label>
                    <Form.Control name="acno" placeholder="Bank Account No." onChange={handleChange} className="pro-input" />
                  </Col>
                </Row>

                {/* --- Nominee Section --- */}
                <SectionHeader icon={User} title="Nominee Details" />
                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label className="pro-label">Nominee Name</Form.Label>
                    <Form.Control name="nname" onChange={handleChange} className="pro-input" />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label className="pro-label">Nominee Aadhar</Form.Label>
                    <Form.Control name="nadhar" onChange={handleChange} className="pro-input" />
                  </Col>
                  <Col md={4} className="mb-4">
                    <Form.Label className="pro-label">Nominee PAN</Form.Label>
                    <Form.Control name="npano" onChange={handleChange} className="pro-input" />
                  </Col>
                </Row>

                {/* --- RD Details --- */}
                <SectionHeader icon={Briefcase} title="RD Configuration" />
                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label className="pro-label">Occupation</Form.Label>
                    <Form.Control name="occupation" placeholder="e.g. Engineer" onChange={handleChange} className="pro-input" />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label className="pro-label">Monthly RD Amount</Form.Label>
                    <InputGroup className="pro-input-group">
                      <InputGroup.Text><DollarSign size={18} /></InputGroup.Text>
                      <Form.Select name="rdamt" onChange={handleChange} className="pro-input">
                        <option value="">Select Amount</option>
                        <option value="800">₹ 800</option>
                        <option value="1200">₹ 1,200</option>
                        <option value="2000">₹ 2,000</option>
                        <option value="2500">₹ 2,500</option>
                      </Form.Select>
                    </InputGroup>
                  </Col>
                  <Col md={4} className="mb-5">
                    <Form.Label className="pro-label">Preferred Start Date</Form.Label>
                    <Form.Control type="date" name="rddate" onChange={handleChange} className="pro-input" />
                  </Col>
                </Row>

                {/* --- Terms & Actions --- */}
                <div className="terms-container mb-4">
                  <Form.Check
                    type="checkbox"
                    id="terms-check"
                    label={
                      <span className="text-white-50">
                        I agree to the <b className="text-primary pointer" onClick={() => setShowTerms(true)}>Terms and Conditions</b>
                      </span>
                    }
                    name="agree"
                    checked={formData.agree === 1}
                    onChange={handleChange}
                  />
                </div>

                <div className="d-flex flex-column flex-md-row gap-3">
                  <Button 
                    className="ultra-btn-primary flex-grow-1"
                    disabled={formData.agree !== 1 || loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Processing..." : "Submit Registration"}
                    <CheckCircle2 size={18} className="ms-2" />
                  </Button>

                  <Button variant="outline-light" className="ultra-btn-secondary" onClick={() => navigate("/")}>
                    <ArrowLeft size={18} className="me-2" />
                    Back to Login
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* --- Modern Modal --- */}
      <Modal show={showTerms} onHide={() => setShowTerms(false)} centered contentClassName="glass-modal">
        <Modal.Header closeButton className="border-secondary text-white">
          <Modal.Title><Info className="me-2 text-primary" /> Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-white-50">
          <ul className="terms-list">
            <li>RD deposit must be paid monthly by the 5th.</li>
            <li>Late payment may include a 2% fine.</li>
            <li>Minimum lock-in tenure is 12 months.</li>
            <li>Premature withdrawal reduces interest yield.</li>
            <li>KYC verification is mandatory before activation.</li>
          </ul>
        </Modal.Body>
        <div className="p-3 pt-0 text-end">
          <Button variant="primary" size="sm" onClick={() => setShowTerms(false)}>Understood</Button>
        </div>
      </Modal>

      <style>{`
        .ultra-reg-wrapper {
          background-color: #0f172a;
          min-height: 100vh;
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .ambient-bg {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
                      radial-gradient(circle at 80% 70%, rgba(192, 38, 211, 0.1) 0%, transparent 40%);
          z-index: 0;
        }

        .glass-reg-card {
          background: rgba(255, 255, 255, 0.03) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 30px !important;
          z-index: 1;
        }

        /* Section Header Styles */
        .section-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          margin-top: 10px;
        }

        .section-header h5 {
          color: #fff;
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
          white-space: nowrap;
        }

        .section-header .line {
          height: 1px;
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.5), transparent);
          flex-grow: 1;
        }

        .icon-box {
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          padding: 8px;
          border-radius: 10px;
        }

        /* Input Styling */
        .pro-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .pro-input-group .input-group-text {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #818cf8;
          border-right: none;
          border-radius: 12px 0 0 12px;
        }

        .pro-input {
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-radius: 12px !important;
          padding: 10px 15px;
        }

        .pro-input-group .pro-input {
          border-left: none !important;
          border-radius: 0 12px 12px 0 !important;
        }

        .pro-input:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
        }

        /* Buttons */
        .ultra-btn-primary {
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-weight: 600;
          transition: 0.3s;
        }

        .ultra-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
        }

        .ultra-btn-secondary {
          padding: 14px 25px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Modal Glass */
        .glass-modal {
          background: #1e293b !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 20px !important;
        }

        .terms-list {
          padding-left: 20px;
        }

        .terms-list li {
          margin-bottom: 10px;
        }

        .pointer { cursor: pointer; }
      `}</style>
    </div>
  );
}
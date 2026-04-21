import {
  Container, Navbar, Row, Col, Card,
  Button, Table, Modal, Form, Badge, InputGroup
} from "react-bootstrap";
import { 
  Eye, Download, PlusCircle, BoxArrowRight, 
  Wallet2, ArrowRepeat, CalendarCheck, ShieldCheck,
  FileEarmarkText, ClockHistory, CurrencyExchange
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UsPage() {
  // ================= LOGIC & STATE (100% Retained) =================
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTran, setSelectedTran] = useState(null);
  const [diffDays, setDiffDays] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: "",
    fineAmt: 0,
    installmentAmt: 0,
    paidAmt: 0,
    status: "",
    totalAmt: 0,
    userId: 0
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      const rid = storedUser?.data?.rid;
      const amt = storedUser?.data?.rdamt;
      setFormData(prev => ({
        ...prev,
        userId: rid,
        installmentAmt: amt
      }));
      tran(rid);
    } else {
      navigate("/");
    }
  }, [navigate]);

  let checkLoan = () => {
    let cnt = transactions.length;
    if (cnt >= 5) {
      alert("Eligible -> Loan Amount:" + (monthlyTotal * 1.5));
    } else {
      alert(cnt + ": Not Eligible Transaction Is Less Than 5! ");
    }
  };

  const calculateFine = (selectedDate) => {
    const rdDate = new Date(user?.data?.rddate);
    const payDate = new Date(selectedDate);
    const diffTime = payDate - rdDate;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDiffDays(days > 0 ? days : 0);
    return days > 0 ? days * 50 : 0;
  };

  const tran = (id) => {
    if (!id) return;
    axios.get(`http://localhost:8080/tranById/${id}`)
      .then(res => setTransactions(res.data.data || []))
      .catch(err => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...formData, [name]: value };
    if (name === "date") {
      const fine = calculateFine(value);
      updated.fineAmt = fine;
      updated.paidAmt = user?.data?.rdamt || 0;
    }
    updated.totalAmt = Number(updated.installmentAmt || 0) + Number(updated.fineAmt || 0);
    updated.status = "PAID";
    setFormData(updated);
  };

  const pay = () => {
    axios.post("http://localhost:8080/tsave", formData)
      .then(() => {
        alert("Transaction Success ✅");
        tran(formData.userId);
        setShowModal(false);
      })
      .catch(() => alert("Error ❌"));
  };

  const viewReceipt = (t) => {
    setSelectedTran(t);
    setShowReceipt(true);
  };

  const downloadReceipt = (t) => {
    const text = `---- PAYMENT RECEIPT ----\nName: ${user?.data?.name}\nDate: ${t.date}\nInstallment: ${t.installmentAmt}\nPaid: ${t.paidAmt}\nFine: ${t.fineAmt}\nTotal: ${t.totalAmt}\nStatus: ${t.status}\n------------------------`;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "receipt.txt";
    link.click();
  };

  const monthlyTotal = transactions.reduce((sum, t) => sum + Number(t.paidAmt || 0), 0);
  const fineCollect = transactions.reduce((fine, f) => fine + Number(f.fineAmt || 0), 0);
  const returnAmt = transactions.length < 5 ? (monthlyTotal / 2 || 0) : ((monthlyTotal * 0.1) + monthlyTotal || 0);

  // ================= UI STYLES =================
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "24px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
  };

  return (
    <div style={{ backgroundColor: "#f4f7fe", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* MODERN NAVBAR */}
      <Navbar expand="lg" className="px-4 py-3 bg-white border-bottom sticky-top">
        <Container fluid>
          <Navbar.Brand className="fw-bolder d-flex align-items-center text-dark">
            <div className="bg-primary p-2 rounded-3 me-2 shadow-primary">
              <ShieldCheck color="white" size={20} />
            </div>
            Rd USER<span className="text-primary">PORTAL</span>
          </Navbar.Brand>
          
          <div className="d-flex align-items-center gap-3">
            <span className="text-muted d-none d-md-block">Welcome back, <strong className="text-dark">{user?.data?.name}</strong></span>
            <Button 
              variant="outline-primary" 
              className="rounded-pill px-4 fw-bold shadow-sm border-2"
              onClick={checkLoan}
            >
              <CurrencyExchange className="me-2" /> Loan Check
            </Button>
            <Button 
              variant="light" 
              className="rounded-circle p-2 text-danger border shadow-sm"
              onClick={() => { localStorage.removeItem("user"); navigate("/"); }}
            >
              <BoxArrowRight size={20} />
            </Button>
          </div>
        </Container>
      </Navbar>

      <Container className="py-5">
        {/* DASHBOARD HEADER */}
        <div className="mb-5 text-center text-md-start">
          <h2 className="fw-black text-dark mb-1">Financial Overview</h2>
          <p className="text-muted">Manage your RD transactions and account health</p>
        </div>

        {/* PRO SUMMARY CARDS */}
        <Row className="g-4 mb-5">
          {[
            { label: "Account Holder", val: user?.data?.name, icon: <ShieldCheck />, grad: "linear-gradient(135deg, #4361ee, #4cc9f0)" },
            { label: "Est. Return", val: `₹${returnAmt}`, icon: <Wallet2 />, grad: "linear-gradient(135deg, #2ec4b6, #80ffdb)" },
            { label: "Total Penalties", val: `₹${fineCollect}`, icon: <ClockHistory />, grad: "linear-gradient(135deg, #e71d36, #ff5d8f)" },
            { label: "Net Collection", val: `₹${monthlyTotal + fineCollect}`, icon: <CurrencyExchange />, grad: "linear-gradient(135deg, #f7971e, #ffd200)" }
          ].map((stat, i) => (
            <Col md={3} key={i}>
              <Card className="border-0 shadow-sm overflow-hidden h-100" style={{ borderRadius: "24px" }}>
                <div style={{ background: stat.grad, padding: "2px", height: "100%" }}>
                  <Card.Body className="bg-white p-4 h-100" style={{ borderRadius: "22px" }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="text-muted small fw-bold text-uppercase">{stat.label}</div>
                      <div className="p-2 rounded-3 bg-light text-primary">{stat.icon}</div>
                    </div>
                    <h3 className="fw-black mb-0 text-dark">{stat.val}</h3>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* TRANSACTIONS SECTION */}
        <Card style={glassStyle} className="border-0 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4 ps-2">
            <div>
              <h4 className="fw-bold mb-0">Transaction Ledger</h4>
              <small className="text-muted">Showing all historical RD contributions</small>
            </div>
            <Button 
              variant="primary" 
              className="rounded-pill px-4 py-2 fw-bold shadow-primary"
              onClick={() => setShowModal(true)}
            >
              <PlusCircle className="me-2" /> New Payment
            </Button>
          </div>

          <Table hover responsive borderless className="align-middle">
            <thead className="bg-light rounded-3 text-muted" style={{ fontSize: "0.85rem" }}>
              <tr>
                <th className="py-3 ps-4 border-0">ID</th>
                <th className="py-3 border-0">EXPECTED DATE</th>
                <th className="py-3 border-0">PAID DATE</th>
                <th className="py-3 border-0">BASE AMT</th>
                <th className="py-3 border-0">PENALTY</th>
                <th className="py-3 border-0">TOTAL PAID</th>
                <th className="py-3 border-0">STATUS</th>
                <th className="py-3 pe-4 border-0 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, idx) => (
                <tr key={t.tid} className="border-bottom">
                  <td className="ps-4 fw-bold text-primary">#{t.tid}</td>
                  <td className="text-muted">{user?.data?.rddate}</td>
                  <td><Badge bg="light" text="dark" className="border px-2 py-1"><CalendarCheck className="me-1 text-primary"/>{t.date}</Badge></td>
                  <td className="fw-semibold">₹{t.installmentAmt}</td>
                  <td className="text-danger">₹{t.fineAmt}</td>
                  <td className="fw-bold text-dark">₹{t.totalAmt}</td>
                  <td>
                    <Badge bg={t.status === "PAID" ? "success" : "warning"} className="bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold">
                      {t.status}
                    </Badge>
                  </td>
                  <td className="pe-4 text-end">
                    <div className="d-flex gap-2 justify-content-end">
                      <Button variant="light" size="sm" className="rounded-circle border" onClick={() => downloadReceipt(t)}>
                        <Download size={14} className="text-primary"/>
                      </Button>
                      <Button variant="light" size="sm" className="rounded-circle border" onClick={() => viewReceipt(t)}>
                        <Eye size={14} className="text-success"/>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>

      {/* ULTRA PRO RECEIPT MODAL */}
      <Modal show={showReceipt} onHide={() => setShowReceipt(false)} centered className="receipt-modal">
        <Modal.Body className="p-0 overflow-hidden" style={{ borderRadius: "24px" }}>
          <div className="p-5 text-center text-white" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }}>
            <FileEarmarkText size={48} className="mb-3 opacity-75"/>
            <h3 className="fw-black mb-1">Payment Successful</h3>
            <p className="opacity-75 mb-0">Transaction Token: #{selectedTran?.tid}</p>
          </div>
          <div className="p-4 bg-white">
            <div className="d-flex justify-content-between mb-2"><span>Account Holder</span><strong className="text-dark">{user?.data?.name}</strong></div>
            <div className="d-flex justify-content-between mb-2"><span>Date of Payment</span><strong className="text-dark">{selectedTran?.date}</strong></div>
            <hr className="my-3 opacity-10"/>
            <div className="d-flex justify-content-between mb-2 text-muted"><span>Installment Amount</span><span>₹{selectedTran?.installmentAmt}</span></div>
            <div className="d-flex justify-content-between mb-2 text-danger"><span>Accumulated Fine</span><span>+ ₹{selectedTran?.fineAmt}</span></div>
            <div className="d-flex justify-content-between mt-3 p-3 bg-light rounded-3">
              <span className="fw-bold text-dark fs-5">Total Remitted</span>
              <span className="fw-black text-primary fs-5">₹{selectedTran?.totalAmt}</span>
            </div>
            <Button variant="primary" className="w-100 rounded-pill py-3 fw-bold mt-4 shadow-primary" onClick={() => setShowReceipt(false)}>Done</Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* ULTRA PRO ADD MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 px-4 pt-4">
          <Modal.Title className="fw-black fs-4">Contribution Portal</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="text-muted small fw-bold text-uppercase">Execution Date</Form.Label>
              <Form.Control 
                type="date" 
                name="date" 
                className="py-3 border-2 rounded-4 focus-ring-primary"
                onChange={handleChange} 
              />
            </Form.Group>

            <Row className="g-3">
              {[
                { label: "Installment", val: formData.installmentAmt, color: "#dark" },
                { label: "Fine Charges", val: formData.fineAmt, color: "red" },
                { label: "Delayed Days", val: diffDays, color: "#4361ee" },
                { label: "Grand Total", val: formData.totalAmt, color: "#198754" }
              ].map((field, k) => (
                <Col xs={6} key={k}>
                  <div className="p-3 bg-light rounded-4 border-dashed border-2 text-center">
                    <small className="text-muted d-block text-uppercase fw-bold mb-1" style={{ fontSize: "0.6rem" }}>{field.label}</small>
                    <h5 className="mb-0 fw-black" style={{ color: field.color }}>₹{field.val}</h5>
                  </div>
                </Col>
              ))}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 p-4 pt-0">
          <Button variant="light" className="rounded-pill px-4 py-2 fw-bold" onClick={() => setShowModal(false)}>Discard</Button>
          <Button variant="primary" className="rounded-pill px-5 py-2 fw-bold shadow-primary" onClick={pay}>Authorize Payment</Button>
        </Modal.Footer>
      </Modal>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        .fw-black { font-weight: 900 !important; }
        .shadow-primary { box-shadow: 0 10px 20px -5px rgba(67, 97, 238, 0.4) !important; }
        .focus-ring-primary:focus { border-color: #4361ee !important; box-shadow: 0 0 0 0.25rem rgba(67, 97, 238, 0.15) !important; }
        .border-dashed { border-style: dashed !important; }
        .table tbody tr { transition: 0.2s; }
        .table tbody tr:hover { transform: scale(1.002); background-color: #fafbff !important; }
      `}</style>
    </div>
  );
}
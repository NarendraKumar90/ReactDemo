import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./wstyle.css";

export default function WalletCard() {
  const [cshow, setCshow] = useState(false);
  const [dshow, setDshow] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const navigate = useNavigate();

  const debit = () => {
    alert("Debit success");
    setDshow(false);
  };

  const credit = () => {
    alert("Credit success");
    setCshow(false);
  };

  const logout = () => {
    alert("logout Successfully ...");
    navigate("/");
  };

  // 🎯 4D EFFECT
  const handleMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = -(y - midY) / 12;
    const rotateY = (x - midX) / 12;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const reset = (e) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <>
      {/* 🔴 Debit Modal */}
      <Modal show={dshow} onHide={() => setDshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Debit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="date" className="mb-2" />
          <Form.Control type="number" placeholder="Amount" className="mb-2" />
          <Form.Control type="text" placeholder="Note" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDshow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={debit}>
            Add Debit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 🟢 Credit Modal */}
      <Modal show={cshow} onHide={() => setCshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="date" className="mb-2" />
          <Form.Control type="number" placeholder="Amount" className="mb-2" />
          <Form.Control type="text" placeholder="Note" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCshow(false)}>
            Close
          </Button>
          <Button variant="success" onClick={credit}>
            Add Credit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* NAVBAR */}
      <nav className="navbar bg-white shadow-sm rounded-pill px-4 mx-3 mt-3">
        <span>User : Narendra Kumar</span>
        <button onClick={logout} className="btn btn-outline-dark">
          Logout
        </button>
      </nav>

      <div className="container py-4">
        <div className="row g-4">

          {/* 🟩 MAIN CARD */}
          <div
            className="col-md-6"
            onMouseEnter={() => setActiveCard("main")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div
              className="card-box"
              onMouseMove={handleMove}
              onMouseLeave={reset}
            >
              <div className="card-ui green">
                 <h4>UId:  10</h4>
                <h3>Opbal: ₹ 100000</h3>
                <div className="d-flex justify-content-between mt-5">
                  {/* <div>
                    <small>Expires</small>
                    <h6>11/50</h6>
                  </div> */}
                </div>
                <div className="text-center mt-2">
                  <small>User</small>
                  <h4>NARENDRA KUMAR</h4>
                </div>
              </div>
            </div>
          </div>

          {/* 🟢 CREDIT */}
          <div
            className="col-md-3"
            onMouseEnter={() => setActiveCard("credit")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div
              className="card-box"
              onMouseMove={handleMove}
              onMouseLeave={reset}
            >
              <div className="card-ui white text-center">
                <h3>Credit</h3>
                <h2 className="text-success">₹ 0</h2>
                <button
                  onClick={() => setCshow(true)}
                  className="btn btn-success mt-2"
                >
                  Add Credit
                </button>
              </div>
            </div>
          </div>

          {/* 🔴 DEBIT */}
          <div
            className="col-md-3"
            onMouseEnter={() => setActiveCard("debit")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div
              className="card-box"
              onMouseMove={handleMove}
              onMouseLeave={reset}
            >
              <div className="card-ui white text-center">
                <h3>Debit</h3>
                <h2 className="text-danger">₹ 0</h2>
                <button
                  onClick={() => setDshow(true)}
                  className="btn btn-danger mt-2"
                >
                  Add Debit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 TABLE */}
        <div className="card mt-4 shadow-sm rounded-4">
          <div className="card-body">
            <h5>Payment History</h5>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>TID</th>
                  <th>DATE</th>
                  <th>NOTE</th>
                  <th>DEBIT</th>
                  <th>CREDIT</th>
                  <th>CLBAL</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>01-01-2025</td>
                  <td>Sample</td>
                  <td className="text-danger">₹ 500</td>
                  <td className="text-success">₹ 1000</td>
                  <td>₹ 500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🚀 CENTER POPUP */}
      {activeCard && (
        <div
          className="overlay"
          onMouseEnter={() => setActiveCard(activeCard)}
          onMouseLeave={() => setActiveCard(null)}
        >
          <div className="floating-card">

            {activeCard === "main" && (
              <div className="card-ui green text-center">
                <h2>₹ 100000</h2>
                <h4>Narendra</h4>
              </div>
            )}

            {activeCard === "credit" && (
              <div className="card-ui white text-center">
                <h3>Credit</h3>
                 <h1>₹ 1000</h1>
              </div>
            )}

            {activeCard === "debit" && (
              <div className="card-ui white text-center">
                <h3>Debit</h3>
                 <h1>₹ 500</h1>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
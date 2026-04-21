import { useState } from "react";
import "./style.css";

export default function Dash() {
  const [activeCard, setActiveCard] = useState(null);

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

  // 🎴 CARD UI
  const renderCard = (type) => {
    if (type === "main") {
      return (
        <div className="card-ui dark">
          <h2>₹ Opbal: 100000</h2>
          <div className="d-flex justify-content-between mt-5">
            <div>
              <small>Card Holder</small>
              <h6>Narendra gg</h6>
            </div>
            <div>
              <small>Expires</small>
              <h6>11/50</h6>
            </div>
          </div>
        </div>
      );
    }

    if (type === "credit") {
      return (
        <div className="card-ui light text-center">
          <h3>Credit</h3>
          <button className="btn btn-success mt-3">Add Credit</button>
        </div>
      );
    }

    if (type === "debit") {
      return (
        <div className="card-ui light text-center">
          <h3>Debit</h3>
          <button className="btn btn-danger mt-3">Add Debit</button>
        </div>
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row g-4">

        {/* MAIN */}
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
            {renderCard("main")}
          </div>
        </div>

        {/* CREDIT */}
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
            {renderCard("credit")}
          </div>
        </div>

        {/* DEBIT */}
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
            {renderCard("debit")}
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
            {renderCard(activeCard)}
          </div>
        </div>
      )}
    </div>
  );
}
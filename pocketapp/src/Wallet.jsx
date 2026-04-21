import { useState } from "react";
import "./style.css"; // <-- ADD CSS FILE

export default function Wallet() {
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
      {/* OVERLAY */}
      {openCard && (
        <div className="overlay" onClick={() => setOpenCard(false)}></div>
      )}

      <div className="container py-4">
        <div className="row g-4">

          {/* CARD HOLDER */}
          <div className="col-md-6">
            <div className="card-holder">

              {/* MAIN CARD */}
              <div
                className={`apa-card ${openCard ? "active" : ""}`}
                onClick={() => setOpenCard(true)}
              >
                <div className="glass"></div>
                <div className="shine"></div>

                <h2>₹ Opbal: 100000</h2>

                <div className="d-flex justify-content-between mt-5">
                  <div>
                    <small>Expires</small>
                    <h6>11/50</h6>
                  </div>

                  <div>
                    <span className="badge bg-danger rounded-circle me-1">&nbsp;</span>
                    <span className="badge bg-warning rounded-circle">&nbsp;</span>
                  </div>
                </div>

                {/* NAME */}
                <div className="name">
                  <small>User</small>
                  <h6>Narendra</h6>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
import React, { useState } from "react";
import { Container, Card, Form, Button, Modal } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export default function Sup() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please read and accept Terms & Conditions");
      return;
    }

    alert("Signup Successful 🎉");
    navigate("/");
  };

    const back = () => {
    navigate(-1);  // ✅ go back
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(#0d3b66,#1e6091)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Container style={{ maxWidth: "450px" }}>
          <Card className="shadow p-4">
            <Card.Body>

              <h3 className="text-center text-primary mb-4">
                Signup
              </h3>

              <Form onSubmit={handleSubmit}>

                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  className="mb-3"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />

                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  className="mb-3"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <Form.Control
                  type="email"
                  placeholder="Email"
                  className="mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="position-relative mb-3">

                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: "40px" }}
                  />

                  <EyeFill
                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  />

                </div>

                {/* Terms Checkbox */}
                <Form.Check
                  type="checkbox"
                  label={
                    <>
                      I agree to{" "}
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => setShowTerms(true)}
                      >
                        Terms & Conditions
                      </span>
                    </>
                  }
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mb-3"
                />

                <Button type="submit" 
                  disabled={!agree}
                className="w-100">
                  Submit
                </Button>

              </Form>

            </Card.Body>
          </Card>
        </Container>

      </div>

      {/* 🔥 Terms Modal */}

      <Modal show={showTerms} onHide={() => setShowTerms(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>RD Terms & Conditions</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <ul>

            <li>RD must be continued for minimum <b>6 months</b>.</li>

            <li>If RD is closed before 6 months, only <b>50% amount</b> will be returned.</li>

            <li>Loan facility is available after completing <b>8 RD installments</b>.</li>

            <li>Monthly RD installment must be paid before the due date.</li>

            <li>Failure to pay may result in RD account suspension.</li>

          </ul>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTerms(false)}>
            Close
          </Button>
             <Button variant="secondary" onClick={back}>
                        Back
                      </Button>
        </Modal.Footer>

      </Modal>

    </>
  );
}
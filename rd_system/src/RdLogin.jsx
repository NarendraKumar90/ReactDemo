import { useState } from "react";
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { EyeFill, PersonFill, ExclamationTriangleFill } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";

export default function RdLogin() {

  const [showPassword, setShowPassword] = useState(false);
  const [tik, setTik] = useState(false);

  const navigate = useNavigate();

  const log = () => {
    alert("Login Success...!");
    navigate("/rduser");
  };

  const agr = (e) => {
    setTik(e.target.checked);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container style={{ maxWidth: "450px" }}>
        <Card className="shadow-sm p-4">
          <Card.Body>

            <h2 className="text-center mb-4 fw-bold">Login</h2>

            {/* Alert */}
            <Alert
              variant="warning"
              className="d-flex align-items-center"
              style={{ backgroundColor: "#f8e5c8", border: "none" }}
            >
              <ExclamationTriangleFill className="me-2 text-warning" />
              <span>We are investigating an ongoing outage.</span>
            </Alert>

            {/* Terms */}
            <Col className="mb-3">
              <Form.Check
                type="checkbox"
                label="Agree Terms & Conditions"
                onChange={agr}
              />
            </Col>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>

              <div className="position-relative">
                <PersonFill
                  className="position-absolute top-50 translate-middle-y ms-3 text-muted"
                />

                <Form.Control
                  type="email"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  style={{ paddingRight: "2.5rem" }}
                />

                <EyeFill
                  className="position-absolute top-50 translate-middle-y end-0 me-3 text-muted"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </Form.Group>

            {/* Remember + Forgot */}
            <Row className="mb-3 align-items-center">
              <Col>
                <Form.Check type="checkbox" label="Remember me" />
              </Col>

              <Col className="text-end">
                <a href="#" className="text-decoration-none">
                  Forgot password?
                </a>
              </Col>
            </Row>

            {/* Login Button */}
            <Button
              onClick={log}
              variant="outline-primary"
              className="w-100 mb-3"
              disabled={!tik}
            >
              LOG IN
            </Button>

            {/* Signup */}
            <div className="text-center">
              <Link to="/signup" className="text-decoration-none">
                Sign up
              </Link>
            </div>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
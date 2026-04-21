import React, { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";   // ✅ import

export default function SignupPage() {

  const navigate = useNavigate();  // ✅ initialize navigate

  const [showPassword, setShowPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [captcha, setCaptcha] = useState(false);

  // validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[A-Za-z]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);
  const minLength = password.length >= 12;

  const passwordValid = hasNumber && hasLetter && hasSpecial && minLength;

  const signupValid =
    fullName &&
    mobile &&
    emailValid &&
    passwordValid &&
    agree &&
    captcha;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupValid) {
      alert("Signup Successful 🎉");
      navigate("/");   // ✅ go to login page after signup
    }
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
                Get Started for FREE
              </h3>

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    isInvalid={email && !emailValid}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Invalid Email
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className="position-relative">

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
                </Form.Group>

                {password && (
                  <Alert variant="light">

                    <div className={hasNumber ? "text-success" : "text-danger"}>
                      {hasNumber ? "✓" : "✗"} One number
                    </div>

                    <div className={hasSpecial ? "text-success" : "text-danger"}>
                      {hasSpecial ? "✓" : "✗"} One special character
                    </div>

                    <div className={minLength ? "text-success" : "text-danger"}>
                      {minLength ? "✓" : "✗"} Minimum 12 characters
                    </div>

                    <div className={hasLetter ? "text-success" : "text-danger"}>
                      {hasLetter ? "✓" : "✗"} One letter required
                    </div>

                  </Alert>
                )}

                <Form.Check
                  className="mb-2"
                  type="checkbox"
                  label="I agree to Terms & Conditions"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />

                <Form.Check
                  className="mb-3"
                  type="checkbox"
                  label="I'm not a robot"
                  checked={captcha}
                  onChange={(e) => setCaptcha(e.target.checked)}
                />

                <Button
                  type="submit"
                  className="w-100"
                  disabled={!signupValid}
                >
                  Submit
                </Button>

              </Form>

            </Card.Body>
          </Card>

          {/* Back Button */}
          <div className="text-center mt-3">
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
          </div>

        </Container>
      </div>
    </>
  );
}
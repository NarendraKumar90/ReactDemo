import { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";

export default function LoginOTP() {

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [showOtpBox, setShowOtpBox] = useState(false);

  // ⏱ TIMER
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // 📲 GENERATE OTP (HARDCODE)
  const sendOtp = () => {

    if (!mobile) {
      alert("Enter mobile number");
      return;
    }

    // 🔥 HARDCODE OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000);
   // const otpCode = "123456";

    setGeneratedOtp(otpCode);
    setShowOtpBox(true);
    setTimer(30); // 30 seconds

    alert("OTP is: " + otpCode); // show for testing
  };

  // ✅ VERIFY OTP
  const verifyOtp = () => {

    if (timer === 0) {
      alert("OTP Expired ❌");
      return;
    }

    if (otp === generatedOtp) {

      alert("Login Success ✅");

      // redirect (example)
      window.location.href = "/user";

    } else {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">

      <Card style={{
        width: "400px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px #ccc"
      }}>

        <h4 className="text-center mb-3">OTP Login</h4>

        {/* MOBILE */}
        <Form.Group className="mb-3">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>

        {/* SEND OTP */}
        <Button onClick={sendOtp} className="w-100 mb-3">
          Send OTP
        </Button>

        {/* OTP INPUT */}
        {showOtpBox && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Group>

            <p style={{ color: "red", textAlign: "center" }}>
              ⏳ Time Left: {timer}s
            </p>

            <Button
              variant="success"
              className="w-100"
              onClick={verifyOtp}
            >
              Verify OTP
            </Button>
          </>
        )}

      </Card>

    </Container>
  );
}
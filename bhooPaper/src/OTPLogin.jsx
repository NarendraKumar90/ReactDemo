import { useState } from "react";
import { auth } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function OTPLogin() {

  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  // SEND OTP
  const sendOtp = async () => {

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );

    const phoneNumber = "+91" + mobile;

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;

      alert("OTP Sent To :"+mobile);

    } catch (error) {
      console.log(error);
      alert("Error sending OTP ❌");
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {

    try {
      await window.confirmationResult.confirm(otp);
      alert("Login Success ✅");
    } catch {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      <h2>OTP Login</h2>

      <input
        type="text"
        placeholder="Enter Mobile"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <br /><br />

      <button onClick={sendOtp}>Send OTP</button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={verifyOtp}>Verify OTP</button>

      {/* MUST HAVE */}
      <div id="recaptcha-container"></div>

    </div>
  );
}
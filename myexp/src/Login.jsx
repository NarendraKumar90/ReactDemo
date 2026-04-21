import { Modal,Container,Card,Form,Button,InputGroup,Row,Col } from "react-bootstrap";
import { PersonFill,LockFill,TelephoneFill,CurrencyRupee } from "react-bootstrap-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState,useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg from "./assets/login.png";
import { UserContext } from "./UserContext";

export default function SignIn() {

  const { setUser } = useContext(UserContext);

  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ FIX 1: moved inside component
  const [typing, setTyping] = useState(false);

  const [data, setData] = useState({
    name: "",
    mob: "",
    opbal: 0
  });

  const navigate = useNavigate();

  // ✅ HANDLE INPUT
  const handlData = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "opbal" ? Number(value) : value
    }));
  };

  // ✅ SIGN UP
  const sign = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    axios
      .post(
        `https://codingshika.com/APP/EXP/add_user.php?mobile=${data.mob}&uname=${data.name}&opbal=${data.opbal}`
      )
      .then((res) => {
        if (res?.data?.posts?.status === "200") {
          toast.success("Registered successfully!");
          setShow(false);
        } else {
          toast.error("Registration failed!");
        }
      })
      .catch(() => toast.error("Server error"))
      .finally(() => setLoading(false));
  };

  // ✅ FIX 2: timer fix (no flicker)
  let timer;

  const autoLogin = (value) => {
    setPwd(value);
    setTyping(true);

    clearTimeout(timer);

    timer = setTimeout(() => {
      setTyping(false);
    }, 500);

    if (value.length === 10) {
      axios
        .post(`https://codingshika.com/APP/EXP/user_login.php?mobile=${value}`)
        .then((res) => {
          if (res?.data?.posts?.status === "200") {

            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));

            toast.success("Auto Login Success!");
            navigate("/dash");

          } else {
            toast.error("Invalid Credential!");
          }
        })
        .catch(() => toast.error("Server error"));
    }
  };

  // ✅ LOGIN (manual)
  const login = (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    axios
      .post(
        `https://codingshika.com/APP/EXP/user_login.php?mobile=${pwd}`
      )
      .then((res) => {
        if (res?.data?.posts?.status === "200") {
          setUser(res.data);
          toast.success("Login Success!");
          navigate("/dash");
        } else {
          toast.error("Invalid Credential!");
        }
      })
      .catch(() => toast.error("Server error"))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* SIGN UP MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-center w-100">
            Sign up
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={sign}>
            <Form.Label>Full name</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><PersonFill /></InputGroup.Text>
              <Form.Control name="name" onChange={handlData} required />
            </InputGroup>

            <Form.Label>Mobile Number</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><TelephoneFill /></InputGroup.Text>
              <Form.Control name="mob" onChange={handlData} required />
            </InputGroup>

            <Form.Label>Opening Balance</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><CurrencyRupee /></InputGroup.Text>
              <Form.Control name="opbal" type="number" onChange={handlData} />
            </InputGroup>

            <Button 
                 style={{
              background: "linear-gradient(180deg, #1f2937, #000)",
              border: "none",
              borderRadius: "8px"
            }}
            type="submit" className="w-100">
              Sign up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* SIGN IN */}
      <Container className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <Row style={{ width: "400px" }}>
          <Col>
            <Card className="p-4 text-center">

              <div className="mb-3">
                <img
                  src={loginImg}
                  alt="login"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "50%"
                  }}
                />
              </div>

              <h3>Sign in</h3>

              <Form onSubmit={login}>
                <InputGroup className="mb-3">
                  <InputGroup.Text><LockFill /></InputGroup.Text>

                  <Form.Control
                    type="text"
                    placeholder="Enter mobile"
                    maxLength={10}
                    onChange={(e) => autoLogin(e.target.value)}
                    required
                  />
                </InputGroup>

                <Button className="w-100" disabled={typing || loading}
                
                   style={{
              background: "linear-gradient(180deg, #1f2937, #000)",
              border: "none",
              borderRadius: "8px"
            }}
                >
                  {typing || loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Loading...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button >

                <div className="mt-3">
                  <small>
                    Don't have account?{" "}
                    <span  className="text-primary" onClick={() => setShow(true)} style={{ cursor: "pointer" }}>
                      Sign up
                    </span>
                  </small>
                </div>

              </Form>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
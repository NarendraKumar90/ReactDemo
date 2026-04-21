import { Modal, Container, Card, Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { PersonFill, EnvelopeFill, LockFill,TelephoneFill,CurrencyRupee   } from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// ✅ import image from assets
import loginImg from "./assets/login.png"; // change path if needed
import { SignUp } from "./SignUp";
import Dash2 from "./Dash2";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios"


export default function SignIn() {
const { setUser}  = useContext(UserContext);


  const[email,setEmail]=useState("")
  const[pwd,setPwd]=useState("")
  const [show, setShow] = useState(false);
  const[data,setData]=useState({"name":"narendra" ,"mob":"123456789" , "opbal": 4000});  
  const msg="Hello Naren!"

    const handlData = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value
    });
  };

//   // handle input change name="name"
// const handleChange = (e)=>{
// setFormData({
// ...formData,
// [e.target.name]: e.target.value
// });
// };

  let hndlemail=(e)=>{setEmail(e.target.value)}
  let hndlpwd=(e)=>{setPwd(e.target.value)}
  const nagivate=useNavigate();

  let sign = () => {
     // axios.post("https://codingshika.com/APP/EXP/add_user.php?mobile="+mob+"&uname="+nm+"&opbal="+opbl)
    axios.post("https://codingshika.com/APP/EXP/add_user.php?mobile="+data.mob+"&uname="+data.name+"&opbal="+data.opbal)
    .then(res=>{
      if(res.data.posts.status=="200"){
        alert("Registered success ...!")
         console.log(data.mob)
         setShow(false)
      }else{
        alert("Fail >>>..")
         setShow(false)
      }
    })
  
  };

  let login = () => {
    
    axios.post("https://codingshika.com/APP/EXP/user_login.php?mobile="+pwd)
    .then(res=>{
      console.log(res.data)
      alert("Data has come")
        setUser(res.data);   // ✅ store globally
    nagivate("/dash")
    })
  if (pwd == '9027080827') {
    alert("Login Success!");
  setUser(res.data);   // ✅ store globally
  //  nagivate("/dash")

    nagivate("/dash", {
      state: { userData: data }   // ✅ sending data
    });

  } else {
    alert("Login Fail..!");
  }
};


  return (

    <>
  
      {/* ================= SIGN UP MODAL ================= */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Sign up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Label>Full name</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><PersonFill /></InputGroup.Text>
              <Form.Control  name="name" placeholder="Narendra Kumar" onChange={handlData} />
            </InputGroup>


                      <Form.Group className="mb-3">
  <Form.Label>Mobile Number</Form.Label>
  <InputGroup>
    <InputGroup.Text>
      <TelephoneFill />
    </InputGroup.Text>
    <Form.Control
    onChange={handlData}
     name="mob"
      type="tel"
      placeholder="Enter mobile number"
    />
  </InputGroup>
</Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>Opening Balance</Form.Label>
  <InputGroup>
    <InputGroup.Text>
      <CurrencyRupee />
    </InputGroup.Text>
    <Form.Control
    onChange={handlData}
      name="opbal"
      type="number"
      placeholder="1000"
    />
  </InputGroup>
</Form.Group>

            {/* <Form.Label>Email</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><EnvelopeFill /></InputGroup.Text>
              <Form.Control type="email" placeholder="your@email.com" />
            </InputGroup> */}

  

            {/* <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><LockFill /></InputGroup.Text>
              <Form.Control type="password" placeholder="******" />
            </InputGroup>

            <Form.Check
              type="checkbox"
              label="I want to receive updates via email."
              className="mb-3"
            /> */}

            <Button
              onClick={sign}
              className="w-100"
              style={{
                background: "linear-gradient(180deg, #1f2937, #000)",
                border: "none",
                borderRadius: "8px"
              }}
            >
              Sign up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    

   {/* ================= SIGN IN PAGE ================= */}
<Container className="vh-100 d-flex align-items-center justify-content-center bg-light">
  <Row className="shadow rounded overflow-hidden" style={{ width: "400px" }}>

    {/* ✅ FORM SECTION */}
    <Col md={12}>
      <Card className="p-4 border-0 text-center">

        {/* 🔼 IMAGE ABOVE SIGN IN */}
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

        {/* 🔽 TITLE */}
        <h3 className="mb-4 fw-bold">Sign in</h3>

        <Form>
          <Form.Group className="mb-3 text-start">
            <Form.Label>Email</Form.Label>
            <Form.Control onChange={hndlemail} type="email" placeholder="your@email.com" />
          </Form.Group>

          <Form.Label className="text-start w-100">Password</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text><LockFill /></InputGroup.Text>
            <Form.Control onChange={hndlpwd} type="password" placeholder="******" />
          </InputGroup>

          <Button
         onClick={login}
            className="w-100"
            style={{
              background: "linear-gradient(180deg, #1f2937, #000)",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Sign in
          </Button>

          <div className="text-center mt-3">
            <small>
              Don't have an account?{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShow(true)}
              >
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





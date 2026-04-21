import { useState } from "react";
import { Form, Button, OverlayTrigger,Tooltip,Container, Row, Col, Modal, ButtonGroup, Dropdown
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';


export default function SignupWithTerms() {
  const [agreed, setAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
   const navigate = useNavigate();

  let sub=()=>{
     navigate('/')
  }
  let back=()=>{
      navigate('/login')
  }

  // Tooltip Content
  const renderTooltip = (props) => (
    <Tooltip id="terms-tooltip" {...props}>
      <ul className="mb-0 ps-3 text-start">
        <li>RD should be at least 5 months. Otherwise, half amount returned.</li>
        <li>Fine amount: ₹50 per day for late payments.</li>
        <li>Loan requires at least 5 transactions.</li>
        <li>User must accept terms before registration.</li>
      </ul>
    </Tooltip>
  );

  // When Signup clicked
  const handleSignup = () => {
    setShowModal(true);
  };

  return (
    <>
      <Container
        fluid
        className="vh-100 d-flex justify-content-center align-items-center bg-dark"
      >
        <Row>
          <Col className="text-center bg-white p-4 rounded shadow">

            <h4 className="mb-3">Create Account</h4>

            {/* Terms Tooltip */}
            <OverlayTrigger  
            // trigger="click"
              placement="top" overlay={renderTooltip}>

              <Button variant="secondary" className="mb-3">
                View Terms
              </Button>
            </OverlayTrigger>

            {/* Checkbox */}
            <Form.Check
              type="checkbox"
              id="terms-checkbox"
              label="I agree to the Terms & Conditions"
              className="mb-3"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />

            {/* Signup Button */}
            <Button
              variant="primary"
              disabled={!agreed}
              onClick={handleSignup}
            >
              Sign Up
            </Button>

          </Col>
        </Row>
      </Container>

      {/* 🔥 Modal Popup Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup Form</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control size="lg" type="text" placeholder="Large text" className="mb-3" />
          <Form.Control type="text" placeholder="Normal text" className="mb-3" />
          <Form.Control size="sm" type="text" placeholder="Small text" className="mb-3" />

          <Dropdown as={ButtonGroup}>
            <Button variant="success">Split Button</Button>
            <Dropdown.Toggle split variant="success" />
            <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={back}>
            Close
          </Button>
          <Button variant="primary" onClick={sub}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
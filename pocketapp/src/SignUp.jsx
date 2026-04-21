import { Container, Card, Form, Button } from "react-bootstrap";

export function SignUp() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow" style={{ width: "400px", borderRadius: "10px" }}>
        
        <h3 className="mb-4 fw-bold">Sign up</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control type="text" placeholder="Jon Snow" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="your@email.com" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="******" />
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="I want to receive updates via email."
            className="mb-3"
          />

          <Button
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
      </Card>
    </Container>
  );
}






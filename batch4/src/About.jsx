import { Container, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";

export default function About() {

  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const search = () => {
    if (searchText.trim() !== "") {
      window.open(`https://www.google.com/search?q=${searchText}`, "_blank");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="p-4 shadow-lg text-center" style={{ width: "400px", borderRadius: "15px" }}>
        
        <h5 className="mb-4">🔍 Search Engine</h5>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            search();
          }}
        >
          <Form.Control
            type="search"
            placeholder="Type something..."
            className="mb-3 p-3"
            value={searchText}
            onChange={handleChange}
            style={{ borderRadius: "25px", fontSize: "18px" }}
          />

          {/* <Button
            type="submit"
            variant="outline-success"
            className="w-100 p-2"
            style={{ borderRadius: "25px", fontSize: "18px" }}
          >
            Search
          </Button> */}
        </Form>

      </Card>
    </Container>
  );
}
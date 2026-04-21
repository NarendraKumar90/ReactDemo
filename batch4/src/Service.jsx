import { Container, Row, Col, Card, Button, Table, Modal, Form } from "react-bootstrap";
import { PlusCircle, PencilSquare, Trash } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Service() {

  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [ushow, setuShow] = useState(false);

  const [sid, setId] = useState("");
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [city, setCity] = useState("");

  // ================= API =================
  const api = () => {
    axios.get("http://localhost:8080/stud")
      .then(res => {
        setStudents(res.data.students);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    api();
  }, []);

  // ================= ADD =================
  const handleAdd = () => {
    setName("");
    setMob("");
    setCity("");
    setShow(true);
  };

  const add = () => {
    const dt = { name, city, mob };

    axios.post("http://localhost:8080/stdsave", dt)
      .then(res => {
        alert("Save success");
        setShow(false);
        api();
      })
      .catch(err => {
        console.error(err);
        alert("Server error");
      });
  };

  // ================= UPDATE =================
  const handleEdit = (s) => {
    setId(s.sid);
    setName(s.name);
    setMob(s.mob);
    setCity(s.city);
    setuShow(true);
  };

  const updt = () => {
    const dt = {
      sid: sid,
      name: name,
      city: city,
      mob: mob
    };

    axios.put("http://localhost:8080/studupdt", dt)
      .then(res => {
        alert("Update success");
        setuShow(false);
        api();
      })
      .catch(err => {
        console.error(err);
        alert("Server error");
      });
  };

  // ================= DELETE =================
  const handleDelete = (id) => {
    axios.delete("http://localhost:8080/del/" + id)
      .then(res => {
        alert("Delete success");
        api();
      })
      .catch(err => {
        console.error(err);
        alert("Server error");
      });
  };

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <>
      <h1>Service</h1>

      <Container className="mt-4">

        {/* Top */}
        <div className="d-flex justify-content-between mb-3">
          <h3>Student Module</h3>
          <Button variant="success" onClick={handleAdd}>
            <PlusCircle /> Add Student
          </Button>
        </div>

        {/* Summary */}
        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h6>Total Students</h6>
                <h4>{students.length}</h4>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm text-center">
              <Card.Body>
                <h6>Current Date</h6>
                <h4>{currentDate}</h4>
                <h6>{currentTime}</h6>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Table */}
        <Card className="shadow-sm">
          <Card.Body>
            <Table bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {students.map(student => (
                  <tr key={student.sid}>
                    <td>{student.sid}</td>
                    <td>{student.name}</td>
                    <td>{student.mob}</td>
                    <td>{student.city}</td>
                    <td className="d-flex gap-2">

                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(student)}
                      >
                        <PencilSquare />
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(student.sid)}
                      >
                        <Trash />
                      </Button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* ADD MODAL */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control value={mob} onChange={(e) => setMob(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} onChange={(e) => setCity(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button onClick={add} variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* UPDATE MODAL */}
        <Modal show={ushow} onHide={() => setuShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Student</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control value={mob} onChange={(e) => setMob(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} onChange={(e) => setCity(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setuShow(false)}>
              Close
            </Button>
            <Button onClick={updt} variant="primary">
              Update
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
}
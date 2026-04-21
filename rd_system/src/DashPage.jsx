import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form, InputGroup } from "react-bootstrap";
import { PencilSquare, Trash, Plus, Search } from "react-bootstrap-icons";
import { Modal, ButtonGroup, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function DashPage() {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [ushow, setUShow] = useState(false);

  /* ================= ADD STATES ================= */

  const [nm, setNm] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [mob, setMob] = useState("");
  const [address, setAddress] = useState("");
  const [adharno, setAdharno] = useState("");
  const [panno, setPanno] = useState("");
  const [acno, setAcno] = useState("");
  const [nname, setNname] = useState("");
  const [nadhar, setNadhar] = useState("");
  const [npano, setNpano] = useState("");
  const [occupation, setOccupation] = useState("");
  const [rdamt, setRdamt] = useState("");
  const [rddate, setRddate] = useState("");
  const [agree, setAgree] = useState(0);

  /* ================= UPDATE STATES ================= */

  const [uRid, setURid] = useState("");
  const [uNm, setUNm] = useState("");
  const [uGender, setUGender] = useState("");
  const [uDob, setUDob] = useState("");
  const [uMob, setUMob] = useState("");
  const [uAddress, setUAddress] = useState("");
  const [uAdharno, setUAdharno] = useState("");
  const [uPanno, setUPanno] = useState("");
  const [uAcno, setUAcno] = useState("");
  const [uNname, setUNname] = useState("");
  const [uNadhar, setUNadhar] = useState("");
  const [uNpano, setUNpano] = useState("");
  const [uOccupation, setUOccupation] = useState("");
  const [uRdamt, setURdamt] = useState("");
  const [uRddate, setURddate] = useState("");
  const [uAgree, setUAgree] = useState(0);

  /* ================= API ================= */

  const api = () => {
    axios.get("http://localhost:8080/udata")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    api();
  }, []);

  /* ================= ADD ================= */

  const add = () => {

    const dt = {
      name: nm,
      gender,
      dob,
      mob,
      address,
      adharno,
      panno,
      acno,
      nname,
      nadhar,
      npano,
      occupation,
      rdamt,
      rddate,
      agree
    };

    axios.post("http://localhost:8080/usave", dt)
      .then(() => {
        alert("Save Success!");
        setShow(false);
        api();
      })
      .catch(() => alert("Save Fail"));
  };

  /* ================= DELETE ================= */

  const del = (id) => {

    if (!window.confirm("Delete this record?")) return;

    axios.delete("http://localhost:8080/dlt/" + id)
      .then(() => {
        alert("Delete Success!");
        api();
      })
      .catch(() => alert("Delete Fail"));
  };

  /* ================= GET UPDATE DATA ================= */

  const getdata = (item) => {

    setUShow(true);

    setURid(item.rid);
    setUNm(item.name);
    setUGender(item.gender);
    setUDob(item.dob);
    setUMob(item.mob);
    setUAddress(item.address);
    setUAdharno(item.adharno);
    setUPanno(item.panno);
    setUAcno(item.acno);
    setUNname(item.nname);
    setUNadhar(item.nadhar);
    setUNpano(item.npano);
    setUOccupation(item.occupation);
    setURdamt(item.rdamt);
    setURddate(item.rddate);
    setUAgree(item.agree);
  };

  /* ================= UPDATE ================= */

  const updt = () => {

    const dt = {
      rid: uRid,
      name: uNm,
      gender: uGender,
      dob: uDob,
      mob: uMob,
      address: uAddress,
      adharno: uAdharno,
      panno: uPanno,
      acno: uAcno,
      nname: uNname,
      nadhar: uNadhar,
      npano: uNpano,
      occupation: uOccupation,
      rdamt: uRdamt,
      rddate: uRddate,
      agree: uAgree
    };

    axios.put("http://localhost:8080/updt", dt)
      .then(() => {
        alert("Update Success!");
        setUShow(false);
        api();
      })
      .catch(() => alert("Update Fail"));
  };

  return (
    <div className="vh-100 bg-light">

      <Container fluid>
        <Row>

          <Col md={12} className="p-4">

            <div className="d-flex justify-content-between mb-4">
              <h2>RD Users</h2>

              <Button onClick={() => setShow(true)} variant="dark">
                <Plus /> Add User
              </Button>
            </div>

            <div className="bg-white p-4 rounded shadow-sm">

              <Row className="mb-3">
                <Col md={4}>
                  <InputGroup>
                    <InputGroup.Text><Search /></InputGroup.Text>
                    <Form.Control placeholder="Search..." />
                  </InputGroup>
                </Col>
              </Row>

              <Table striped bordered hover responsive>

                <thead className="table-light">
                  <tr>
                    <th>RID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Aadhar</th>
                    <th>PAN</th>
                    <th>Account</th>
                    <th>Nominee</th>
                    <th>Occupation</th>
                    <th>RD Amt</th>
                    <th>RD Date</th>
                    <th>Flag</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {data.length > 0 ? (

                    data.map((item) => (
                      <tr key={item.rid}>

                        <td>{item.rid}</td>
                        <td>{item.name}</td>
                        <td>{item.gender}</td>
                        <td>{item.dob}</td>
                        <td>{item.mob}</td>
                        <td>{item.address}</td>
                        <td>{item.adharno}</td>
                        <td>{item.panno}</td>
                        <td>{item.acno}</td>
                        <td>{item.nname}</td>
                        <td>{item.occupation}</td>
                        <td>{item.rdamt}</td>
                        <td>{item.rddate}</td>
                        <td>{item.agree === 1 ? "Yes" : "No"}</td>

                        <td className="d-flex gap-2">

                          <Button
                            onClick={() => getdata(item)}
                            variant="outline-primary"
                            size="sm"
                          >
                            <PencilSquare />
                          </Button>

                          <Button
                            onClick={() => del(item.rid)}
                            variant="outline-danger"
                            size="sm"
                          >
                            <Trash />
                          </Button>

                        </td>

                      </tr>
                    ))

                  ) : (

                    <tr>
                      <td colSpan="15" className="text-center">
                        No Records Found
                      </td>
                    </tr>

                  )}

                </tbody>
              </Table>

            </div>
          </Col>

        </Row>
      </Container>

      {/* ================= ADD MODAL ================= */}

      <Modal show={show} onHide={() => setShow(false)} centered>

        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Control placeholder="Name" onChange={(e)=>setNm(e.target.value)} className="mb-3"/>
          <Form.Control placeholder="Gender" onChange={(e)=>setGender(e.target.value)} className="mb-3"/>
          <Form.Control type="date" onChange={(e)=>setDob(e.target.value)} className="mb-3"/>
          <Form.Control placeholder="Mobile" onChange={(e)=>setMob(e.target.value)} className="mb-3"/>
          <Form.Control placeholder="Address" onChange={(e)=>setAddress(e.target.value)} className="mb-3"/>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>Close</Button>
          <Button variant="primary" onClick={add}>Submit</Button>
        </Modal.Footer>

      </Modal>

      {/* ================= UPDATE MODAL ================= */}

      <Modal show={ushow} onHide={()=>setUShow(false)} centered>

        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Control value={uNm} onChange={(e)=>setUNm(e.target.value)} className="mb-3"/>
          <Form.Control value={uGender} onChange={(e)=>setUGender(e.target.value)} className="mb-3"/>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setUShow(false)}>Close</Button>
          <Button variant="primary" onClick={updt}>Update</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
}
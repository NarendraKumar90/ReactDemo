





import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form, InputGroup, Nav } from "react-bootstrap";
import { PencilSquare, Trash, Plus, Search } from "react-bootstrap-icons";
import { Modal, ButtonGroup, Dropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";



export default function Home(){

    const[data,setData]=useState([])
    const[show,setShow]=useState(false)
    const[ushow,setUShow]=useState(false)

    
//add

    const [acno, setAcno] = useState("");
  const [address, setAddress] = useState("");
  const [adharno, setAdharno] = useState("");
  const [agree, setAgree] = useState(0);
  const [dob, setDob] = useState("DOB");
  const [gender, setGender] = useState("");
  const [mob, setMob] = useState("");
  const [nadhar, setNadhar] = useState("");
  const [nm, setNm] = useState("");
  const [nname, setNname] = useState("");
  const [npano, setNpano] = useState("");
  const [occupation, setOccupation] = useState("");
  const [panno, setPanno] = useState("");
  const [rdamt, setRdamt] = useState("RD Amount:");
  const [rddate, setRddate] = useState("RD Date");
  const [rid, setRid] = useState("")

    let handleAcno = (e) => { setAcno(e.target.value); };
  let handleAddress = (e) => { setAddress(e.target.value); };
  let handleAdharno = (e) => { setAdharno(e.target.value); };
  let handleDob = (e) => { setDob(e.target.value); };
  let handleGender = (e) => { setGender(e.target.value); };
  let handleMob = (e) => { setMob(e.target.value); };
  let handleNadhar = (e) => { setNadhar(e.target.value); };
  let handleNm = (e) => { setNm(e.target.value); };
  let handleNname = (e) => { setNname(e.target.value); };
  let handleNpano = (e) => { setNpano(e.target.value); };
  let handleOccupation = (e) => { setOccupation(e.target.value); };
  let handlePanno = (e) => { setPanno(e.target.value); };
  let handleRdamt = (e) => { setRdamt(e.target.value); };
  let handleRddate = (e) => { setRddate(e.target.value); };
  let handleRid = (e) => { setRid(e.target.value); };

//   // Checkbox
//   let hndlag = (e) => { 
//     setAgree(e.target.checked ? 1 : 0);
//   };

//update

const [uAcno, setUAcno] = useState("");
const [uAddress, setUAddress] = useState("");
const [uAdharno, setUAdharno] = useState("");
const [uAgree, setUAgree] = useState(0);
const [uDob, setUDob] = useState("");
const [uGender, setUGender] = useState("");
const [uMob, setUMob] = useState("");
const [uNadhar, setUNadhar] = useState("");
const [uNm, setUNm] = useState("");
const [uNname, setUNname] = useState("");
const [uNpano, setUNpano] = useState("");
const [uOccupation, setUOccupation] = useState("");
const [uPanno, setUPanno] = useState("");
const [uRdamt, setURdamt] = useState("");
const [uRddate, setURddate] = useState("");
const [uRid, setURid] = useState("");



   let uhandleNm = (e) => { setUNm(e.target.value); };
    let uhandleGender = (e) => { setUGender(e.target.value); };
     let uhandleDob = (e) => { setUDob(e.target.value); };
      let uhandleMob = (e) => { setUMob(e.target.value); };
      let uhandleAddress = (e) => { setUAddress(e.target.value); };
       let uhandleAdharno = (e) => { setUAdharno(e.target.value); };
          let uhandlePanno = (e) => { setUPanno(e.target.value); };
             let uhandleAcno = (e) => { setUAcno(e.target.value); };
              let uhandleNname = (e) => { setUNname(e.target.value); };
                   let uhandleNadhar = (e) => { setUNadhar(e.target.value); };
                    let uhandleNpano = (e) => { setUNpano(e.target.value); };
                       let uhandleOccupation = (e) => { setUOccupation(e.target.value); };
                        let uhandleRddate = (e) => { setURddate(e.target.value); };


 

let getdata=(item)=>{
    setUShow(true)
    setURid(item.rid)
  setUNm(item.name)

  
 
    setUAcno(item.acno)
    setUAddress(item.address)
    setUAdharno(item.adharno)
    setUAgree(item.agree)
   
  
    setUMob(item.mob)
    setUNname(item.nname)
    setUNadhar(item.nadhar)
    setUNpano(item.npano)
    setUOccupation(item.occupation)
    setUPanno(item.panno)
    setURdamt(item.rdamt)
    setURddate(item.rddate)
    alert(uRid)

}

let updt=()=>{
                 
          const dt={
    acno:uAcno,
    address:uAddress,
    adharno:uAdharno,
    agree:uAgree,
    dob:uDob,
    gender:uGender,
    mob:uMob,
    nadhar:uNadhar,
    name: uNm,
    nname:uNname,
    npano:uNpano,
    occupation:uOccupation,
    panno:uPanno,
    rdamt:uRdamt,
    rddate:uRddate,
     rid:uRid
  };
   
     axios.put("http://localhost:8080/updt",dt)
        .then(res=>{
            alert("update Success!")
        })
        .catch(" update Fail")
         alert("Update:"+rid)
          api() 
      setUShow(false)
}



    let add=()=>{
        const dt={
    acno:acno,
    address:address,
    adharno:adharno,
    agree:agree,
    dob:dob,
    gender:gender,
    mob:mob,
    nadhar:nadhar,
    name: nm,
    nname:nname,
    npano:npano,
    occupation:occupation,
    panno:panno,
    rdamt:rdamt,
    rddate:rddate
    // rid:rid,
  }; 
        
        axios.post("http://localhost:8080/usave",dt)
        .then(res=>{
            alert("Save Success!")
        })
        .catch(" save Fail")
        alert("Add"+nm)
          api() 
        setShow(false)
    }

    let del=(id)=>{
        alert(id)
         axios.delete("http://localhost:8080/dlt/"+id)
        .then(res=>{
            alert("delete Success!")
        })
        .catch(" delete Fail")
          api() 
        setShow(false)
    }

  /* ================= API ================= */

  let api = () => {
    axios.get("http://localhost:8080/udata")
      .then(res =>{
           setData(res.data)
      } )
      .catch(err => console.log(err));
     
  };
useEffect(() => {
     api() 
     }, []);

    return(
        <>
     

        {/* User Data */}
      
           
          <div className="vh-100 bg-light">
            <Container fluid>
              <Row>
      
                {/* Main Content */}
                <Col md={10} className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-semibold">Admin Home Users</h2>
                    <Button onClick={() => setShow(true)}  variant="dark" className="d-flex align-items-center gap-2">
                      <Plus /> Add User
                    </Button>
                  </div>
      
                  <div className="bg-white p-4 rounded shadow-sm">
                    <Row className="mb-3">
                      <Col md={4}>
                        <InputGroup>
                          <InputGroup.Text>
                            <Search />
                          </InputGroup.Text>
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
                  <th>Aadhar No</th>
                  <th>PAN No</th>
                 <th>Account No</th>
                  <th>Nominee Name</th>
                  <th>Nominee Aadhar</th>
                  <th>Nominee PAN</th>
                  <th>Occupation</th>
                  <th>RD Amount</th>
                  <th>RD Date</th>
                  <th>Flag</th>
                  <th>Action</th>
                </tr>
                      </thead>
                      <tbody>
                       {data && data.length > 0 ? (
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
              <td>{item.nadhar}</td>
              <td>{item.npano}</td>
              <td>{item.occupation}</td>
              <td>{item.rdamt}</td>
              <td>{item.rddate}</td>
              <td>{item.agree === 1 ? "Yes" : "No"}</td>
                          
                            <td className="d-flex gap-2">
                              <Button onClick={() => getdata(item)}  variant="outline-primary" size="sm">
                                <PencilSquare />
                              </Button>
                              <Button onClick={()=>{del(item.rid)}}  variant="outline-danger" size="sm" >
                                <Trash />
                              </Button>
                            </td>
       
                          </tr> )))
                        : (
          <tr>
            <td colSpan="17" className="text-center">
              Record Not Found. Please Start the Server!
            </td>
          </tr>
        )}
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
      
       
      
      
             {/* 🔥 Add Modal Popup Form */}
      
            <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Form</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
      
          <Form.Control type="text" onChange={handleNm} placeholder="Name" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleGender} placeholder="Gender" className="mb-3" />
      
         
          <Form.Group className="mb-3">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control 
          type="date" 
          onChange={handleDob}
        />
      </Form.Group>
      
          <Form.Control type="text" onChange={handleMob} placeholder="Mobile" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleAddress } placeholder="Address" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleAdharno } placeholder="Aadhar No" className="mb-3" />
      
          <Form.Control type="text"  onChange={handlePanno } placeholder="PAN No" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleAcno } placeholder="Account No" className="mb-3" />
      
          <Form.Control type="text" onChange={handleNname } placeholder="Nominee Name" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleNadhar} placeholder="Nominee Aadhar No" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleNpano } placeholder="Nominee PAN No" className="mb-3" />
      
          <Form.Control type="text"  onChange={handleOccupation } placeholder="Occupation" className="mb-3" />
      
        <Dropdown as={ButtonGroup} onSelect={setRdamt } className="mb-3 w-100">
        <Button variant="outline-secondary" className="w-100 text-start bg-white text-dark border">
          {rdamt}
        </Button>
        <Dropdown.Toggle split variant="outline-secondary" className="bg-white text-dark border" />
        <Dropdown.Menu className="w-100">
          <Dropdown.Item eventKey="2000">2000</Dropdown.Item>
          <Dropdown.Item eventKey="1300">1300</Dropdown.Item>
          <Dropdown.Item eventKey="1500">1500</Dropdown.Item>
          <Dropdown.Item eventKey="800">800</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
              <Form.Label>Select RD Date</Form.Label>
          <Form.Control type="date" value={rddate} onChange={handleRddate } placeholder="RD Date:"  className="mb-3" />
      
          <Dropdown as={ButtonGroup} onSelect={setAgree} className="mb-3 w-100">
           <Button variant="outline-secondary" className="w-100 text-start bg-white text-dark border">
          {agree}
        </Button>
           <Dropdown.Toggle split variant="outline-secondary" className="bg-white text-dark border" />
        <Dropdown.Menu className="w-100">
              <Dropdown.Item eventKey="0">0</Dropdown.Item>
              <Dropdown.Item eventKey="1">1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary" onClick={add}>Submit</Button>
        </Modal.Footer>
      </Modal>
      
      
      
          {/* 🔥 Update Modal Popup Form */}
      
            <Modal show={ushow} onHide={() => setUShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
      
        <Modal.Body>
      
      
      
          <Form.Control type="text" value={uNm} onChange={uhandleNm} placeholder="Name" className="mb-3" />
      
          <Form.Control type="text" value={uGender} onChange={uhandleGender} placeholder="Gender" className="mb-3" />
      
          <Form.Control type="date" value={uDob}  onChange={uhandleDob } placeholder="DOB" className="mb-3" />
      
          <Form.Control type="text" value={uMob} onChange={uhandleMob} placeholder="Mobile" className="mb-3" />
      
          <Form.Control type="text" value={uAddress}  onChange={uhandleAddress } placeholder="Address" className="mb-3" />
      
          <Form.Control type="text" value={uAdharno} onChange={uhandleAdharno } placeholder="Aadhar No" className="mb-3" />
      
          <Form.Control type="text" value={uPanno}  onChange={uhandlePanno } placeholder="PAN No" className="mb-3" />
      
          <Form.Control type="text" value={uAcno} onChange={uhandleAcno } placeholder="Account No" className="mb-3" />
      
          <Form.Control type="text" value={uNname} onChange={uhandleNname } placeholder="Nominee Name" className="mb-3" />
      
          <Form.Control type="text" value={uNadhar}  onChange={uhandleNadhar} placeholder="Nominee Aadhar No" className="mb-3" />
      
          <Form.Control type="text" value={uNpano} onChange={uhandleNpano } placeholder="Nominee PAN No" className="mb-3" />
      
          <Form.Control type="text" value={uOccupation} onChange={uhandleOccupation } placeholder="Occupation" className="mb-3" />
      
        <Dropdown as={ButtonGroup} onSelect={setURdamt } className="mb-3 w-100">
        <Button variant="outline-secondary" className="w-100 text-start bg-white text-dark border">
          {uRdamt}
        </Button>
        <Dropdown.Toggle split variant="outline-secondary" className="bg-white text-dark border" />
        <Dropdown.Menu className="w-100">
          <Dropdown.Item eventKey="2000">2000</Dropdown.Item>
          <Dropdown.Item eventKey="1300">1300</Dropdown.Item>
          <Dropdown.Item eventKey="1500">1500</Dropdown.Item>
          <Dropdown.Item eventKey="800">800</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
          <Form.Control type="date" value={uRddate} onChange={uhandleRddate } placeholder="RD Date:"  className="mb-3" />
      
          <Dropdown as={ButtonGroup} onSelect={setUAgree} className="mb-3 w-100">
           <Button variant="outline-secondary" className="w-100 text-start bg-white text-dark border">
          {uAgree}
        </Button>
           <Dropdown.Toggle split variant="outline-secondary" className="bg-white text-dark border" />
        <Dropdown.Menu className="w-100">
              <Dropdown.Item eventKey="0">0</Dropdown.Item>
              <Dropdown.Item eventKey="1">1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      
        </Modal.Body>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setUShow(false)}>Close</Button>
          <Button variant="primary" onClick={()=>{updt()}} >Submit</Button>  
        </Modal.Footer>
      </Modal>




        </>
    )
}
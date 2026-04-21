import axios from "axios"
import { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";

function Rduser() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([])
   const [amount, setAmount] = useState("Select RD_Amount");

  const[nm,setName]=useState("")
  const[mob,setMob]=useState("")
  const[mail,setMail]=useState("")
  let handleNm=(e)=>{setName(e.target.value)}
  let handleMob=(e)=>{setMob(e.target.value)}
   let handleMail=(e)=>{setMail(e.target.value)}



// get user
  const api = () => {
    axios.get("http://localhost:8080/udata")
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
      .catch(err => console.log(err))
  }

  //add user
  let add=()=>{

    const dt={
      name:nm,
      mob:mob
    }
    axios.post("",dt)
    .then(res=>{

    }).catch(err => alert(err))

    alert(nm+mob+mail+amount);
    setShow(false)
  }

  let handleSelect=(e)=>{
      setAmount(e)
      console.log("Select Value"+e);
  }
   const navigate = useNavigate();
  //Update user
  let updt=()=>{
    alert("update success")
  
  }
  
    //Update user
  let del=()=>{
    alert("Delete success")
  }

  let logout=()=>{
    alert("User logged out")
    navigate('/')
  }


  useEffect(() => {
    api()
  }, [])

  return (
    <>
  <div className="d-flex justify-content-between align-items-center my-3 px-2">
      <Button variant="success" onClick={handleShow}>
       Add User
      </Button>
  
  <Button variant="secondary" onClick={logout}> Logout</Button>
</div>
<br />

  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Dropdown as={ButtonGroup} onSelect={handleSelect}>
      <Button variant="info">{amount}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-amount" />

      <Dropdown.Menu>
        <Dropdown.Item eventKey="2000">2000</Dropdown.Item>
        <Dropdown.Item eventKey="1300">1300</Dropdown.Item>
        <Dropdown.Item eventKey="1500">1500</Dropdown.Item>
        <Dropdown.Item eventKey="800">800</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

            <Form.Control size="lg" type="text" onChange={handleNm} placeholder="Name" />
              <Form.Control size="lg" type="number" onChange={handleMob} placeholder="Mobile" />
           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={handleMail} placeholder="name@example.com" />
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={add}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

   <Table striped bordered hover responsive>
      <thead>
        <tr>
            <th>RID</th>
            <th>Account No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Aadhar No</th>
            <th>PAN No</th>
            <th>Nominee Name</th>
            <th>Nominee Aadhar</th>
            <th>Nominee PAN</th>
            <th>Occupation</th>
            <th>RD Amount</th>
            <th>RD Date</th>
            <th>Agree</th>
            <th>Action</th>
          </tr>
        </thead>

      <tbody>
  {data && data.length > 0 ? (
    data.map((item) => (
      <tr key={item.rid}>
        <td>{item.rid}</td>
        <td>{item.acno}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.dob}</td>
        <td>{item.mob}</td>
        <td>{item.address}</td>
        <td>{item.adhrno}</td>
        <td>{item.panno}</td>
        <td>{item.nname}</td>
        <td>{item.nadhar}</td>
        <td>{item.npano}</td>
        <td>{item.occupation}</td>
        <td>{item.rdamt}</td>
        <td>{item.rddate}</td>
        <td>{item.agree === 1 ? "Yes" : "No"}</td>
        <td>
          <Button variant="primary" onClick={() => updt(item.rid)}>Update</Button>
          <Button variant="danger" onClick={() => del(item.rid)}>Delete</Button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="17" className="text-center">
        Record Not Found. Please run the API!
      </td>
    </tr>
  )}
</tbody>
    </Table>
    </>
  )
}

export default Rduser
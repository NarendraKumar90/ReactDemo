import axios from "axios";
import { useState,useEffect } from "react";
import { Container, Row, Col,Modal, Table, Button, Form, InputGroup, Nav } from "react-bootstrap";
import { PencilSquare, Trash, Eye, JournalText } from "react-bootstrap-icons";




export default function UserPage(){
    const[data,setData]=useState([])
   const [showModal, setShowModal] = useState(false);
const [passbookData, setPassbookData] = useState([]);
const [PEshowModal, setPEShowModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);
const[rid,setRid]=useState(0);
const[name,setName]=useState("");
const[ttl,setTtl]=useState(0);
const[totalFine,setTotalFine]=useState(0);
const[rdcnt,setCnt]=useState(0);

    let addPassbk=(rid)=>{
        alert("add Passbook: "+rid)
        setRid(rid)
        setPEShowModal(true)
    }

    let updtUser=()=>{
        alert("Update user")
        setShowEditModal(true)
    }

    let del=()=>{
        alert("delete!")
    }

    let mAmt=()=>{
      if(rdcnt>=6){
          alert("Matured Amount is: "+ttl+(ttl*0.14))
      }else{
         alert("Matured Amount is: "+(ttl/2))
      }
     
    }

     let loan=()=>{
      if(rdcnt<6){
          alert("Not Eligible for Loan... Your transaction is less than 6 !")
      }else{
            alert("Eligible for Loan...!");
      }
     
    }


let viewPassbk = (rid, name) => {
  try {
    axios.get("http://localhost:8080/PbookById/" + rid)
      .then(res => {

        // set table data
        setPassbookData(res.data);

        // calculate total from API response
        const totalAmount = res.data.reduce(
          (sum, item) => sum + Number(item.p_rdamt || 0),
          0
        );

          // calculate totalFine from API response
        const fine = res.data.reduce(
          (finesum, item) => finesum + Number(item.fineAmt || 0),
          0
        );

        // set states
        setCnt(res.data.length);
        setTotalFine(fine);
        setTtl(totalAmount);
        setName(name);
        setRid(rid);

        // open modal
        setShowModal(true);
      });

    alert("Api call! " + rid);

  } catch (error) {
    console.error(error);
  }
};
       

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
        <h1>User</h1>
       
        <Button >GetPassbook</Button>

         <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
            <th>RID</th>
            <th>Name</th>
            <th>Gender</th>
             <th>DOB</th>
            <th>Occupation</th>
            <th>Account No</th>
            <th>Aadhar No</th>
            <th>PAN No</th>
              <th>Address</th>
            <th>RD Amount</th>
            <th>RD Date</th>
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
        <td>{item.occupation}</td>
       
        <td>{item.acno}</td>
        <td>{item.adharno}</td>
     
        <td>{item.panno}</td>
        <td>{item.address}</td>
        <td>{item.rdamt}</td>
        <td>{item.rddate }</td>
                    
                      <td className="d-flex gap-2">
                      <Button onClick={()=>viewPassbk(item.rid,item.name)} variant="outline-info" size="sm">
  <Eye />
</Button>

<Button onClick={()=>addPassbk(item.rid)} variant="outline-success" size="sm">
  <JournalText />
</Button>

<Button onClick={updtUser} variant="outline-primary" size="sm">
  <PencilSquare />
</Button>

<Button onClick={del} variant="outline-danger" size="sm">
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


              {/* //passbook model */}


<Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  size="lg"
>

  <Modal.Header closeButton>
    <Modal.Title>RD Passbook Entries</Modal.Title>
  </Modal.Header>

  {/* Top Info Section */}
  <div className="px-3 pt-2">

    <Row className="mb-2">
      <Col><strong>RID:</strong> {rid}</Col>
      <Col><strong>Name:</strong> {name}</Col>
    </Row>

    {/* Summary Cards */}
    <Row className="mb-3">

      <Col md={4}>
        <div className="border rounded p-2 text-center bg-light">
          <div className="fw-bold">Total Deposit</div>
          <div>{ttl}</div>
        </div>
      </Col>

      <Col md={4}>
        <div className="border rounded p-2 text-center bg-light">
          <div className="fw-bold">Total Fine</div>
          <div>{totalFine}</div>
        </div>
      </Col>

      <Col md={4}>
        <div className="border rounded p-2 text-center bg-light">
          <div className="fw-bold">Net Amount</div>
          <div>{ttl + 10}</div>
        </div>
      </Col>

    </Row>

    {/* Action Buttons */}
    <div className="d-flex gap-2 mb-3">
      <Button variant="outline-warning" onClick={loan}>Loan</Button>
      <Button variant="outline-success" onClick={mAmt}>Maturity Amount</Button>
    </div>

  </div>

  <Modal.Body>
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Pid</th>
          <th>Rid</th>
          <th>RD Amount</th>
          <th>RD Date</th>
          <th>Late Days</th>
          <th>Fine</th>
        </tr>
      </thead>

      <tbody>
        {passbookData.map((item) => (
          <tr key={item.pid}>
            <td>{item.pid}</td>
            <td>{item.rid}</td>
            <td>{item.p_rdamt}</td>
            <td>{item.p_rddate}</td>
            <td>{item.lateDays}</td>
            <td>{item.fineAmt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Modal.Body>

  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowModal(false)}
    >
      Close
    </Button>
  </Modal.Footer>

</Modal>


{/*Add Passbook Entry */}

<Modal show={PEshowModal} onHide={() => setPEShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Add Passbook Entry</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>

      <Form.Group className="mb-2">
        <Form.Label>RID</Form.Label>
        <Form.Control
          type="text"
          name="rid"
        value={rid}
          readOnly
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="p_rddate"
       
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>RD Amount</Form.Label>
        <Form.Control
          type="number"
          name="p_rdamt"
        
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Late Days</Form.Label>
        <Form.Control
          type="number"
          name="lateDays"
        
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Fine Amount</Form.Label>
        <Form.Control
          type="number"
          name="fineAmt"
        //   value={formData.fineAmt}
        //   onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Is Settle</Form.Label>
        <Form.Select
          name="isShtl"
        
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </Form.Select>
      </Form.Group>

    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setPEShowModal(false)}>
      Close
    </Button>

    <Button variant="success">
      Save Entry
    </Button>
  </Modal.Footer>
</Modal>

{/* rd user Update */}

<Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Update RD Account</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>RID</Form.Label>
            <Form.Control
              type="text"
              name="rid"
              value={rid}
              readOnly
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
           
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
           
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              type="date"
              name="dob"
           
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Occupation</Form.Label>
            <Form.Control
              type="text"
              name="occupation"
         
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Account No</Form.Label>
            <Form.Control
              type="text"
              name="acno"
           
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>Aadhar No</Form.Label>
            <Form.Control
              type="text"
              name="adharno"
         
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>PAN No</Form.Label>
            <Form.Control
              type="text"
              name="panno"
       
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="address"
      
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>RD Amount</Form.Label>
            <Form.Control
              type="number"
              name="rdamt"
            //   value={formData.rdamt}
            //   onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-2">
            <Form.Label>RD Date</Form.Label>
            <Form.Control
              type="date"
              name="rddate"
            
            />
          </Form.Group>
        </Col>
      </Row>

    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
      Close
    </Button>

    <Button variant="primary">
      Update
    </Button>
  </Modal.Footer>
</Modal>

        </>
    )
}
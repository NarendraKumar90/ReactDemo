import { Container, Row, Col, Card, Button, Table, Modal, Form } from "react-bootstrap";
import { PlusCircle, PencilSquare, Trash } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Students(){

const [students,setStudents] = useState([]);
const [show,setShow] = useState(false);
const [editId,setEditId] = useState(null);

const [formData,setFormData] = useState({
name:"",
mob:"",
city:""
});

const currentDate = new Date().toLocaleDateString();


// Fetch students
useEffect(()=>{

axios.get("http://127.0.0.1:3000/students")
.then(res=>{
setStudents(res.data);
})
.catch(err=>console.log(err));

},[]);


// handle input change name="name"
const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]: e.target.value
});
};


// open add form
const handleAdd = ()=>{
setEditId(null);
setFormData({
name:"",
mob:"",
city:""
});
setShow(true);
};


// save student
const handleSave = ()=>{

if(editId){

// update
axios.put("http://127.0.0.1:3000/students/"+editId,formData)
.then(()=>{
setStudents(prev =>
prev.map(s => s.sid === editId ? {...formData,sid:editId} : s)
);
});

}else{

// add
axios.post("http://127.0.0.1:3000/students",formData)
.then(res=>{
setStudents([...students,res.data]);
});

}

setShow(false);

};


// edit student
const handleEdit = (student)=>{
setEditId(student.sid);
setFormData(student);
setShow(true);
};


// delete student
const handleDelete = (id)=>{

axios.delete("http://127.0.0.1:3000/students/"+id)
.then(()=>{
setStudents(students.filter(s => s.sid !== id));
});

};


return(

<Container className="mt-4">

{/* Top Section */}

<div className="d-flex justify-content-between mb-3">

<h3>Student Module</h3>

<Button variant="success" onClick={handleAdd}>
<PlusCircle/> Add Student
</Button>

</div>


{/* Summary Grid */}

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
</Card.Body>
</Card>
</Col>

</Row>


{/* Student Table */}

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

{students.map(student =>(

<tr key={student.sid}>

<td>{student.sid}</td>
<td>{student.name}</td>
<td>{student.mob}</td>
<td>{student.city}</td>

<td className="d-flex gap-2">

<Button
variant="outline-primary"
size="sm"
onClick={()=>handleEdit(student)}
>
<PencilSquare/>
</Button>

<Button
variant="outline-danger"
size="sm"
onClick={()=>handleDelete(student.sid)}
>
<Trash/>
</Button>

</td>

</tr>

))}

</tbody>

</Table>

</Card.Body>

</Card>



{/* Add / Update Modal */}

<Modal show={show} onHide={()=>setShow(false)}>

<Modal.Header closeButton>
<Modal.Title>{editId ? "Update Student" : "Add Student"}</Modal.Title>
</Modal.Header>

<Modal.Body>

<Form>

<Form.Group className="mb-3">
<Form.Label>Name</Form.Label>
<Form.Control
name="name"
value={formData.name}
onChange={handleChange}
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Mobile</Form.Label>
<Form.Control
name="mob"
value={formData.mob}
onChange={handleChange}
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>City</Form.Label>
<Form.Control
name="city"
value={formData.city}
onChange={handleChange}
/>
</Form.Group>

</Form>

</Modal.Body>

<Modal.Footer>

<Button variant="secondary" onClick={()=>setShow(false)}>
Close
</Button>

<Button variant="primary" onClick={handleSave}>
Save
</Button>

</Modal.Footer>

</Modal>


</Container>

);

}
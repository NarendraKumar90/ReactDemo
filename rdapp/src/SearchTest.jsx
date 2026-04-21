import { Container, Row, Col, Card, Table, Button, Modal, Badge, InputGroup, FormControl, Form } from "react-bootstrap";
import { PlusCircle, PencilSquare, Trash, Eye, ClockHistory, PeopleFill, CashStack, Receipt, ShieldCheck, Search, GeoAltFill } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", mob: "", rdamt: "", address: "", acno: "" });

  useEffect(() => { fetchData(); }, []);

  const fetchData = () => {
    axios.get("http://localhost:8080/udata").then(res => {
      setUsers(res.data.data);
      setFilteredUsers(res.data.data);
    });
  };

  // Search Logic
  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setFilteredUsers(users.filter(u => u.name.toLowerCase().includes(val) || u.mob.includes(val)));
  };

  // Add User
  const addUser = () => {
    axios.post("http://localhost:8080/usave", formData).then(() => {
      toast.success("User added successfully!");
      setShowAddModal(false);
      fetchData();
    });
  };

  // Update User
  const updateUser = () => {
    axios.put("http://localhost:8080/updt", selectedUser).then(() => {
      toast.success("Updated successfully!");
      setShowEditModal(false);
      fetchData();
    });
  };

  // Delete User
  const deleteUser = (rid) => {
    axios.delete("http://localhost:8080/dlt/" + rid).then(() => {
      toast.error("User deleted!");
      fetchData();
    });
  };

  // View History
  const viewHistory = () => {
    axios.get("http://localhost:8080/tran").then(res => {
      setHistoryData(res.data);
      setShowHistoryModal(true);
    });
  };

  return (
    <Container fluid className="p-4">
      <Toaster />
      
      {/* Top Controls */}
      <div className="d-flex justify-content-between mb-4">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text><Search /></InputGroup.Text>
          <FormControl placeholder="Search users..." onChange={handleSearch} />
        </InputGroup>
        <div>
          <Button variant="dark" onClick={viewHistory} className="me-2"><ClockHistory /> History</Button>
          <Button variant="success" onClick={() => setShowAddModal(true)}><PlusCircle /> Add User</Button>
        </div>
      </div>

      {/* Table */}
      <Table hover responsive>
        <thead><tr><th>ID</th><th>Name</th><th>Mobile</th><th>Actions</th></tr></thead>
        <tbody>
          {filteredUsers.map(u => (
            <tr key={u.rid}>
              <td>#{u.rid}</td>
              <td>{u.name}</td>
              <td>{u.mob}</td>
              <td>
                <Button size="sm" variant="info" onClick={() => { setSelectedUser(u); setShowViewModal(true); }}><Eye /></Button>
                <Button size="sm" variant="warning" className="mx-2" onClick={() => { setSelectedUser(u); setShowEditModal(true); }}><PencilSquare /></Button>
                <Button size="sm" variant="danger" onClick={() => deleteUser(u.rid)}><Trash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
        <Modal.Header closeButton><Modal.Title>User Details</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>Name: {selectedUser?.name}</p>
          <p>Mobile: {selectedUser?.mob}</p>
        </Modal.Body>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton><Modal.Title>Add New User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control className="mb-2" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />
          <Form.Control className="mb-2" placeholder="Mobile" onChange={e => setFormData({...formData, mob: e.target.value})} />
        </Modal.Body>
        <Modal.Footer><Button onClick={addUser}>Save</Button></Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton><Modal.Title>Update User</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Control className="mb-2" value={selectedUser?.name || ""} onChange={e => setSelectedUser({...selectedUser, name: e.target.value})} />
          <Form.Control className="mb-2" value={selectedUser?.mob || ""} onChange={e => setSelectedUser({...selectedUser, mob: e.target.value})} />
        </Modal.Body>
        <Modal.Footer><Button onClick={updateUser}>Update</Button></Modal.Footer>
      </Modal>

      {/* History Modal */}
      <Modal show={showHistoryModal} onHide={() => setShowHistoryModal(false)}>
        <Modal.Header closeButton><Modal.Title>History</Modal.Title></Modal.Header>
        <Modal.Body>
          {historyData.map((h, i) => <div key={i}>{h.date} - {h.status}</div>)}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
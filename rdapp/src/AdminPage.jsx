import {
  Container, Row, Col, Card, Table, Button, Modal, Badge, InputGroup, FormControl,
  Toast
} from "react-bootstrap";
import {
  PlusCircle, PencilSquare, Trash, Eye, ClockHistory, 
  PeopleFill, Wallet2, Receipt, PersonBadgeFill, Search, Filter,
  ArrowUpRight, CashStack, ShieldCheck, GeoAltFill
} from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {
  // ================= STATE MANAGEMENT (Unchanged) =================
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [totalRd, setTotalRd] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalFine, setTotalFine] = useState(0);
  const[showAddModal, setShowAddModal] = useState(false);
  const[showUModal, setshowUModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHModal, setShowHModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
      name: "", gender: "", dob: "", mob: "", address: "", 
      adharno: "", panno: "", acno: "", nname: "", nadhar: "", 
      npano: "", occupation: "", rdamt: "", rddate: "", agree: 0
    });

  // ================= DATA FETCHING (Unchanged logic) =================
  useEffect(() => {
    axios.get("http://localhost:8080/udata")
      .then(res => {
        const data = res?.data?.data || [];
        setUsers(data);
        setTotalRd(data.length);
        const amount = data.reduce((sum, u) => sum + Number(u.rdamt || 0), 0);
        setTotalAmount(amount);
      })
      .catch(err => {
        console.log(err);
        alert("User API error ❌");
      });

    axios.get("http://localhost:8080/cnt")
      .then(res => {
        setTotalFine(res?.data?.data || 0);
      })
      .catch(err => {
        console.log(err);
        setTotalFine(0);
      });
  }, []);

  //handle chage
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? (checked ? 1 : 0)
        : name === "rdamt"
        ? Number(value)
        : value
  }));
};



  //=========update =========
const openEditModal = (user) => {
  setFormData(user);
  setshowUModal(true);
};

const handleUpdt = () => {
  axios.put("http://localhost:8080/updt", formData) // ✅ send data
    .then(res => {
      if (res.status === 200) {
        const updated = users.map(u =>
          u.rid === formData.rid ? formData : u
        );

        setUsers(updated);
        toast.success("Update success!");
        setshowUModal(false);
      }
    })
    .catch(err => {
      console.log(err);
      toast.error("Update Failed!");
    });
};

  //==========Search ======
const filteredUsers = users.filter((u) =>
  u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  u.mob?.includes(searchTerm) ||
  u.acno?.includes(searchTerm)
);


  // =========== add ===========
  const openAddModal = () => {
  setFormData({
    name: "", gender: "", dob: "", mob: "", address: "",
    adharno: "", panno: "", acno: "", nname: "", nadhar: "",
    npano: "", occupation: "", rdamt: "", rddate: "", agree: 0
  });
  setShowAddModal(true);
};
  
const handleAdd = () => {
  axios.post("http://localhost:8080/usave", formData)
    .then(res => {
      if (res.status === 200) {

        const newUser = res.data.data; // ✅ backend should return saved object with rid

        setUsers((prev) => [...prev, newUser]); // ✅ use response, NOT formData

        toast.success("Save Success!");
        setShowAddModal(false);
      }
    })
    .catch(err => {
      console.log(err);

      // ✅ DUPLICATE KEY HANDLING
      if (err.response?.status === 409) {
        toast.error("Duplicate Entry! Account or Aadhar already exists ❌");
      } else {
        toast.error("Save Failed!");
      }
    });
};

// ================History =============
let allTran =()=>{
  alert("Transation")
  axios.get("http://localhost:8080/tran")
  .then(res=>{
    console.log(res.data)
    setData(res.data.data)
    setShowHModal(true)
  })
}



  // ================= ACTIONS (Unchanged logic) =================
const deleteUser = (rid) => {
  if (!window.confirm("Are you sure?"+rid)) return;

  axios.delete("http://localhost:8080/dlt/" + rid)
    .then(() => {
      setUsers(users.filter(u => u.rid !== rid));
      toast.success("Deleted!");
    });
};

  const viewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // ================= ULTRA PRO STYLES =================
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)"
  };

  return (
    <Container fluid style={{ background: "#f0f2f5", minHeight: "100vh", padding: "2rem" }}>
      
      {/* --- TOP NAVIGATION BAR --- */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 p-3" style={glassStyle}>
        <div>
          <h3 className="fw-bold mb-0" style={{ letterSpacing: "-1px", color: "#1a1c2e" }}>
            Admin <span style={{ color: "#198754" }}>Dashboard</span>
          </h3>
          <small className="text-muted">Welcome back, Super Admin Naren</small>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <InputGroup style={{ width: "250px" }}>
            <InputGroup.Text className="bg-white border-end-0 rounded-start-pill">
              <Search size={14} />
            </InputGroup.Text>
<FormControl
  placeholder="Search users..."
  className="border-start-0 rounded-end-pill"
  onChange={(e) => setSearchTerm(e.target.value)}
/>          </InputGroup>
          <Button variant="dark" className="rounded-pill px-4 shadow-sm" onClick={allTran}>
            <ClockHistory className="me-2" /> History
          </Button>
        </div>
      </div>

      {/* --- SUMMARY METRICS --- */}
      <Row className="mb-4 g-4">
        {[
          { title: "Total Users", val: totalRd, icon: <PeopleFill />, color: "#4361ee", bg: "rgba(67, 97, 238, 0.1)" },
          { title: "Vault Balance", val: `₹${totalAmount}`, icon: <CashStack />, color: "#2ec4b6", bg: "rgba(46, 196, 182, 0.1)" },
          { title: "Penalty Pool", val: `₹${totalFine}`, icon: <Receipt />, color: "#e71d36", bg: "rgba(231, 29, 54, 0.1)" },
          { title: "System Health", val: "Optimal", icon: <ShieldCheck />, color: "#ff9f1c", bg: "rgba(255, 159, 28, 0.1)" }
        ].map((item, idx) => (
          <Col md={3} key={idx}>
            <Card style={{ ...glassStyle, border: "none" }} className="h-100 stat-card">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="p-3 rounded-3" style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <Badge bg="light" text="dark" className="border">
                    <ArrowUpRight className="me-1 text-success" /> +2.5%
                  </Badge>
                </div>
                <h6 className="text-muted text-uppercase small fw-bold mb-1">{item.title}</h6>
                <h2 className="fw-bold mb-0" style={{ color: "#1a1c2e" }}>{item.val}</h2>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- MAIN DATA TABLE --- */}
      <Card style={glassStyle} className="border-0 overflow-hidden">
        <Card.Header className="bg-white p-4 border-0 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-bold mb-0">Registered Members</h5>
            <small className="text-muted">Direct management of RD accounts</small>
          </div>
          <Button variant="success" className="rounded-pill px-4 py-2 fw-bold shadow-sm" onClick={openAddModal}>
            <PlusCircle className="me-2" /> New Account
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0 align-middle">
            <thead style={{ background: "#f8f9fa" }}>
              <tr>
                <th className="ps-4 py-3 border-0">ID NO.</th>
                <th className="py-3 border-0">MEMBER INFO</th>
                <th className="py-3 border-0">MOBILE</th>
                <th className="py-3 border-0 text-center">RD CONTRIBUTION</th>
                <th className="py-3 border-0 text-end pe-4">MANAGEMENT</th>
              </tr>
            </thead>
            <tbody>
           {filteredUsers.map(user => (
                <tr key={user.rid} className="table-row-hover">
                  <td className="ps-4 fw-bold text-muted">#{user.rid}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar me-3">{user.name.charAt(0)}</div>
                      <div className="fw-bold text-dark">{user.name}</div>
                    </div>
                  </td>
                  <td>{user.mob}</td>
                  <td className="text-center">
                    <Badge bg="success" className="bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold">
                      ₹ {user.rdamt}
                    </Badge>
                  </td>
                  <td className="text-end pe-4">
                    <div className="d-flex justify-content-end gap-2">
                      <Button variant="outline-primary" size="sm" className="action-btn border-0 rounded-circle"
                     onClick={() => openEditModal(user)}>
                        <PencilSquare />
                      </Button>
                      <Button variant="outline-danger" size="sm" className="action-btn border-0 rounded-circle"
                        onClick={() => deleteUser(user.rid)}>
                        <Trash />
                      </Button>
                      <Button variant="dark" size="sm" className="rounded-pill px-3 shadow-sm"
                        onClick={() => viewUser(user)}>
                        <Eye className="me-1" /> View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* --- USER DETAIL MODAL --- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="md" className="custom-modal">
        <Modal.Body className="p-0 overflow-hidden" style={{ borderRadius: "20px" }}>
          {/* Header Gradient */}
          <div className="p-5 text-center text-white" style={{ background: "linear-gradient(135deg, #1a1c2e 0%, #4361ee 100%)" }}>
            <div className="avatar-lg mx-auto mb-3 shadow-lg">{selectedUser?.name.charAt(0)}</div>
            <h3 className="fw-bold mb-1">{selectedUser?.name}</h3>
            <p className="small opacity-75 mb-0"><GeoAltFill className="me-1"/> {selectedUser?.address}</p>
          </div>

          <div className="p-4 bg-white">
            <Row className="g-4">
              <Col xs={6}>
                <div className="detail-item">
                  <label>A/C NUMBER</label>
                  <h6>{selectedUser?.acno}</h6>
                </div>
              </Col>
              <Col xs={6}>
                <div className="detail-item">
                  <label>AADHAR NO</label>
                  <h6>{selectedUser?.adharno}</h6>
                </div>
              </Col>
              <Col xs={6}>
                <div className="detail-item">
                  <label>CONTACT</label>
                  <h6>{selectedUser?.mob}</h6>
                </div>
              </Col>
              <Col xs={6}>
                <div className="detail-item">
                  <label>GENDER / DOB</label>
                  <h6>{selectedUser?.gender} / {selectedUser?.dob}</h6>
                </div>
              </Col>

              <Col xs={12}><hr className="my-2 opacity-10"/></Col>

              <Col xs={6}>
                <div className="detail-item">
                  <label className="text-success fw-bold">MONTHLY RD</label>
                  <h4 className="fw-bold text-success">₹ {selectedUser?.rdamt}</h4>
                </div>
              </Col>
              <Col xs={6}>
                <div className="detail-item text-end">
                  <label>START DATE</label>
                  <h6>{selectedUser?.rddate}</h6>
                </div>
              </Col>

              <Col xs={12}>
                <div className="p-3 rounded-3" style={{ background: "#f8f9fa", border: "1px dashed #dee2e6" }}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <label className="text-muted small">NOMINEE</label>
                      <h6 className="mb-0">{selectedUser?.nname}</h6>
                    </div>
                    <div className="text-end">
                      <label className="text-muted small">NOMINEE AADHAR</label>
                      <h6 className="mb-0">{selectedUser?.nadhar}</h6>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <div className="p-3 border-top text-center bg-white">
            <Button variant="light" className="rounded-pill px-5 fw-bold" onClick={() => setShowModal(false)}>
              Close Terminal
            </Button>
          </div>
        </Modal.Body>
      </Modal>

{/* Add */}
<Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered size="md" className="custom-modal">
  <Modal.Body className="p-0 overflow-hidden" style={{ borderRadius: "20px" }}>

    {/* Header Gradient */}
    <div className="p-5 text-center text-white"
      style={{ background: "linear-gradient(135deg, #1a1c2e 0%, #4361ee 100%)" }}>
      
      <div className="avatar-lg mx-auto mb-3 shadow-lg">
        {formData?.name ? formData.name.charAt(0) : "A"}
      </div>

      <h4 className="fw-bold mb-1">Add New Record</h4>

      <input
        className="form-control text-center mt-2"
        placeholder="Enter Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    </div>

    {/* FORM BODY */}
    <div className="p-4 bg-white">
      <Row className="g-3">

        <Col xs={6}>
          <label>Account No</label>
          <input className="form-control" name="acno" value={formData.acno} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Mobile</label>
          <input className="form-control" name="mob" value={formData.mob} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Aadhar</label>
          <input className="form-control" name="adharno" value={formData.adharno} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>PAN</label>
          <input className="form-control" name="panno" value={formData.panno} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Gender</label>
          <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Col>

        <Col xs={6}>
          <label>DOB</label>
          <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
        </Col>

        <Col xs={12}>
          <label>Address</label>
          <input className="form-control" name="address" value={formData.address} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>RD Amount</label>
          <input className="form-control" name="rdamt" value={formData.rdamt} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>RD Start Date</label>
          <input type="date" className="form-control" name="rddate" value={formData.rddate} onChange={handleChange} />
        </Col>

        <Col xs={12}><hr /></Col>

        <Col xs={6}>
          <label>Nominee Name</label>
          <input className="form-control" name="nname" value={formData.nname} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Nominee Aadhar</label>
          <input className="form-control" name="nadhar" value={formData.nadhar} onChange={handleChange} />
        </Col>

        <Col xs={12}>
          <label>Nominee PAN</label>
          <input className="form-control" name="npano" value={formData.npano} onChange={handleChange} />
        </Col>

        <Col xs={12}>
          <label>Occupation</label>
          <input className="form-control" name="occupation" value={formData.occupation} onChange={handleChange} />
        </Col>

        {/* <Col xs={12}>
          <div className="form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.agree === 1}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "agree",
                    value: e.target.checked ? 1 : 0
                  }
                })
              }
            />
            <label className="form-check-label">Agree</label>
          </div>
        </Col> */}

      </Row>
    </div>

    {/* FOOTER */}
    <div className="p-3 border-top text-center bg-white">
      <Button
        variant="success"
        className="rounded-pill px-5 fw-bold me-2"
        onClick={handleAdd}
      >
        Save Record
      </Button>

      <Button
        variant="light"
        className="rounded-pill px-5 fw-bold"
        onClick={() => setShowAddModal(false)}
      >
        Cancel
      </Button>
    </div>

  </Modal.Body>
</Modal>


{/* Update */}

<Modal show={showUModal} onHide={() => setshowUModal(false)} centered size="md" className="custom-modal">
  <Modal.Body className="p-0 overflow-hidden" style={{ borderRadius: "20px" }}>

    {/* Header Gradient */}
    <div className="p-5 text-center text-white"
      style={{ background: "linear-gradient(135deg, #1a1c2e 0%, #4361ee 100%)" }}>
      
      <div className="avatar-lg mx-auto mb-3 shadow-lg">
        {formData?.name ? formData.name.charAt(0) : "A"}
      </div>

      <h4 className="fw-bold mb-1">Update Record</h4>

      <input
        className="form-control text-center mt-2"
        placeholder="Enter Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
    </div>

    {/* FORM BODY */}
    <div className="p-4 bg-white">
      <Row className="g-3">

        <Col xs={6}>
          <label>Account No</label>
          <input className="form-control" name="acno" value={formData.acno} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Mobile</label>
          <input className="form-control" name="mob" value={formData.mob} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Aadhar</label>
          <input className="form-control" name="adharno" value={formData.adharno} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>PAN</label>
          <input className="form-control" name="panno" value={formData.panno} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Gender</label>
          <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Col>

        <Col xs={6}>
          <label>DOB</label>
          <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
        </Col>

        <Col xs={12}>
          <label>Address</label>
          <input className="form-control" name="address" value={formData.address} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>RD Amount</label>
          <input className="form-control" name="rdamt" value={formData.rdamt} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>RD Start Date</label>
          <input type="date" className="form-control" name="rddate" value={formData.rddate} onChange={handleChange} />
        </Col>

        <Col xs={12}><hr /></Col>

        <Col xs={6}>
          <label>Nominee Name</label>
          <input className="form-control" name="nname" value={formData.nname} onChange={handleChange} />
        </Col>

        <Col xs={6}>
          <label>Nominee Aadhar</label>
          <input className="form-control" name="nadhar" value={formData.nadhar} onChange={handleChange} />
        </Col>

        <Col xs={12}>
          <label>Nominee PAN</label>
          <input className="form-control" name="npano" value={formData.npano} onChange={handleChange} />
        </Col>

        <Col xs={12}>
          <label>Occupation</label>
          <input className="form-control" name="occupation" value={formData.occupation} onChange={handleChange} />
        </Col>

      

      </Row>
    </div>

    {/* FOOTER */}
    <div className="p-3 border-top text-center bg-white">
      <Button
        variant="success"
        className="rounded-pill px-5 fw-bold me-2"
        onClick={handleUpdt}
      >
        Update Record
      </Button>

      <Button
        variant="light"
        className="rounded-pill px-5 fw-bold"
        onClick={() => setshowUModal(false)}
      >
        Cancel
      </Button>
    </div>

  </Modal.Body>
</Modal>

      {/* History Model */}
    <Modal
  show={showHModal}
  onHide={() => setShowHModal(false)}
  centered
  size="lg"
>
  {/* HEADER */}
  <Modal.Header closeButton>
    <Modal.Title className="fw-bold">
      Transaction History
    </Modal.Title>
  </Modal.Header>

  {/* BODY */}
  <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
    <Table bordered hover responsive className="align-middle text-center">
      <thead className="table-dark">
        <tr>
          <th>Tid</th>
          <th>User ID</th>
          <th>Date</th>
          <th>Installment</th>
          <th>Paid</th>
          <th>Fine</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td>{item.tid}</td>
              <td>{item.userId}</td>
              <td>{item.date}</td>
              <td>₹ {item.installmentAmt}</td>
              <td>₹ {item.paidAmt}</td>
              <td>₹ {item.fineAmt}</td>
              <td>
                <span
                  className={`badge ${
                    item.status === "PAID"
                      ? "bg-success"
                      : item.status === "PARTIAL"
                      ? "bg-warning text-dark"
                      : "bg-danger"
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-muted py-3">
              No Transactions Found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </Modal.Body>

  {/* FOOTER */}
  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => setShowHModal(false)}
      className="rounded-pill px-4"
    >
      Close
    </Button>
  </Modal.Footer>
</Modal>

      {/* --- GLOBAL CSS --- */}
      <style>{`
        .stat-card { transition: all 0.3s ease; cursor: default; }
        .stat-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }
        
        .avatar { width: 40px; height: 40px; background: #e9ecef; color: #4361ee; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-weight: bold; }
        .avatar-lg { width: 80px; height: 80px; background: white; color: #4361ee; display: flex; align-items: center; justify-content: center; border-radius: 25px; font-weight: bold; font-size: 2rem; }
        
        .table-row-hover:hover { background: #fcfdfe !important; transition: 0.2s; }
        .action-btn:hover { transform: scale(1.1); }
        
        .detail-item label { font-size: 0.65rem; color: #adb5bd; font-weight: 800; display: block; margin-bottom: 2px; }
        .detail-item h6 { font-weight: bold; color: #212529; margin-bottom: 0; }
        
        .custom-modal .modal-content { border-radius: 20px; border: none; overflow: hidden; }
      `}</style>

    </Container>
  );
}
import { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import "./style2.css";

export default function Dash2() {

  const { Conuser } = useContext(UserContext);
  const navigate = useNavigate();

  const [cshow, setCshow] = useState(false);
  const [dshow, setDshow] = useState(false);
  const [data, setData] = useState([]);
  const [bal, setBal] = useState(0);
   const [id, setId] = useState(0);
const [form, setForm] = useState({
  date: "",
  amt: "",
  note: "",
  debit: 0,
  credit: 0
});
  // ✅ SAFETY CHECK
  if (!Conuser?.posts?.id) {
    return <h3 className="text-center mt-5">Loading...  You Need To Restart the App</h3>;
  }

   


// INPUT HANDLER
// let handl = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value
//   });
// };

let handl = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...form,
    [name]: value,
    ...(name === "credit" && { debit: 0 }),
    ...(name === "debit" && { credit: 0 })
  }));
};

// CREDIT FUNCTION
let creditFunc = () => {
  console.log(form);
   setId(Conuser?.posts?.id)
 

      axios.post("https://codingshika.com/APP/EXP/insert_credit.php?date="+form.date+"&note="+form.note+"&debit="+form.debit+"&credit="+form.credit+"&uid="+id)
    .then(res=>{
      if(res.data.posts.status=="200"){
        alert("Credit Success..!")
        opbal()
         tran()
        setCshow(false)
      }else{
        alert("Failed..!")
       setCshow(false)
      }
    })


  alert(
    `Date: ${form.date}
UId: ${id}
Note: ${form.note}
Debit: ${form.debit}
Credit: ${form.credit}`
  );
};

// DEBIT FUNCTION
let debitFunc = () => {
  console.log(form);
  if(bal>=form.debit){
    axios.post("https://codingshika.com/APP/EXP/insert_debit.php?date="+form.date+"&note="+form.note+"&debit="+form.debit+"&credit="+form.credit+"&uid="+id)
      .then(res=>{
        if(res.data.posts.status=="200"){
          alert("Debit Success..!")
          opbal()
           tran()
          setDshow(false)
        }else{
          alert("Failed..!")
           setDshow(false)
        }
      })  
    }else{
    alert("Insufficiant Balance..!")
      setDshow(false)
  }

  alert(
    `Date: ${form.date}
Amount: ${form.amt}
Note: ${form.note}
Credit: ${form.credit}
Debit: ${form.debit}`
  );


};

  // ✅ FETCH BALANCE
  const opbal = () => {
    axios
      .get(`https://codingshika.com/APP/EXP/opbal_list.php?uid=${Conuser.posts.id}`)
      .then((res) => {
        if (res.data.posts.status === "200") {
          setBal(res.data.posts.post[0].OPBAL);
        }
      });
  };

  // ✅ FETCH TRANSACTIONS
  const tran = () => {
    axios
      .get(`https://codingshika.com/APP/EXP/transaction_list.php?uid=${Conuser.posts.id}`)
      .then((res) => {
        if (res.data.posts.status === "200") {
          setData(res.data.posts.post);
          console.log(res.data.posts.post)
        }
      });
  };

  const logout = () => navigate("/");

  useEffect(() => {
    opbal();
    tran();
   setId(Conuser?.posts?.id)
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "Do you want to refresh"; // triggers browser confirmation
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };


  }, []);

  return (
    <>
      {/* CREDIT MODAL */}
      <Modal show={cshow} onHide={() => setCshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control    onChange={handl}
     name="date" type="date" />
          <br />
          <Form.Control  name="credit" onChange={handl} type="number" placeholder="Amount" />
          <br />
          <Form.Control  name="note" onChange={handl}  type="text" placeholder="Note" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setCshow(false)}>Close</Button>
          <Button onClick={creditFunc} variant="success">Add Credit</Button>
        </Modal.Footer>
      </Modal>

      {/* DEBIT MODAL */}
      <Modal show={dshow} onHide={() => setDshow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Debit Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control  name="date" onChange={handl}  type="date" />
          <br />
          <Form.Control  name="debit" onChange={handl}  type="number" placeholder="Amount" />
          <br />
          <Form.Control  name="note" onChange={handl}  type="text" placeholder="Note" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setDshow(false)}>Close</Button>
          <Button onClick={debitFunc} variant="danger">Add Debit</Button>
        </Modal.Footer>
      </Modal>

      {/* NAVBAR */}
      <nav className="navbar bg-white shadow-sm px-4 mt-3">
        <h5>
          <i className="bi bi-person-circle me-2"></i>
          Welcome {Conuser.posts.name}
        </h5>

        <button onClick={logout} className="btn btn-outline-dark">
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </nav>

      {/* MAIN */}
      <div className="container py-4">
        <div className="row g-4">

        
        {/* BALANCE CARD */}
<div className="col-md-6">
  <div className="apa-wrapper">
    <div className="card-holder">

      <div className="apa-card p-4 text-white rounded-4">

        {/* GLASS EFFECT */}
        <div className="glass"></div>

        {/* SHINE EFFECT */}
        <div className="shine"></div>

        <h3>
          <i className="bi bi-wallet2 me-2"></i>
          Opening Balance
        </h3>

        <h2 className="mt-3">
          <i className="bi bi-currency-rupee"></i> {bal}
        </h2>

        <p className="mt-3">
          User: {Conuser.posts.name}
        </p>

         <p className="mt-3">
          U_Id: {Conuser.posts.id}
        </p>

      </div>

    </div>
  </div>
</div>

          {/* CREDIT */}
          <div className="col-md-3">
            <div className="card text-center p-3 shadow">
              <div>
                <i className="bi bi-graph-up-arrow text-success fs-1"></i>
              </div>

              <h4>Credit</h4>

              <button
                onClick={() => setCshow(true)}
                className="btn btn-outline-success mt-2"
              >
                <i className="bi bi-plus-circle me-1"></i>
                Add Credit
              </button>
            </div>
          </div>

          {/* DEBIT */}
          <div className="col-md-3">
            <div className="card text-center p-3 shadow">
              <div>
                <i className="bi bi-graph-down-arrow text-danger fs-1"></i>
              </div>

              <h4>Debit</h4>

              <button
                onClick={() => setDshow(true)}
                className="btn btn-outline-danger mt-2"
              >
                <i className="bi bi-dash-circle me-1"></i>
                Add Debit
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card mt-4 shadow">
          <div className="card-body">
            <h5>
              <i className="bi bi-clock-history me-2"></i>
              Payment History
            </h5>

            <table className="table mt-3">
              <thead>
                <tr>
                  <th>TID</th>
                  <th>DATE</th>
                  <th>NOTE</th>
                  <th>DEBIT</th>
                  <th>CREDIT</th>
                  <th>CLBAL</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.T_ID}</td>
                    <td>{item.DATE}</td>
                    <td>{item.NOTE}</td>
                    <td style={{ color: "red" }}>{item.DEBIT}</td>
                    <td style={{ color: "green" }}>{item.CREDIT}</td>
                    <td>{item.CLBAL}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
}
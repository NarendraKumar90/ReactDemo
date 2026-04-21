import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Contact() {

  const [data, setData] = useState({
    nm1: "",
    nm2: ""
  });

  let get = () => {
    alert("Hello ! " + data.nm1 + " " + data.nm2);
  }

  let handl = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value
    });

    // alert(data.nm1);
  }

  return (
    <>
      <center>
        <h1>Addition Two Number</h1>

        <Form.Control 
          type="number" 
          name="nm1" 
          onChange={handl} 
          placeholder="No. 1" 
        />

        <br />

        <Form.Control 
          type="number" 
          name="nm2" 
          onChange={handl} 
          placeholder="No. 2" 
        />

        <br />

        <Button variant="secondary" onClick={get}>
          Secondary
        </Button>

        <h1>{Number(data.nm1) + Number(data.nm2)}</h1>

      </center>
    </>
  );
}
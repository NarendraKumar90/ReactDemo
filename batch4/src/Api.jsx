import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";


export default function Api() {

const [summary,setSummary] = useState({});
const [regional,setRegional] = useState([]);

useEffect(()=>{

axios.get("https://api.rootnet.in/covid19-in/stats/latest")
.then(res => {

setSummary(res.data.data.summary);
setRegional(res.data.data.regional);

})
.catch(err=>{
console.log(err);
});

},[]);

return(

<Container className="mt-4">

<h3 className="mb-4 text-center">COVID Dashboard</h3>

{/* GRID CARDS */}

<Row className="mb-4">

<Col md={4}>
<Card className="shadow text-center">
<Card.Body>
<h6>Total Cases</h6>
<h4>{summary.total}</h4>
</Card.Body>
</Card>
</Col>

<Col md={4}>
<Card className="shadow text-center">
<Card.Body>
<h6>Recovered</h6>
<h4>{summary.discharged}</h4>
</Card.Body>
</Card>
</Col>

<Col md={4}>
<Card className="shadow text-center">
<Card.Body>
<h6>Total Deaths</h6>
<h4>{summary.deaths}</h4>
</Card.Body>
</Card>
</Col>

</Row>

<Row className="mb-4">

<Col md={4}>
<Card className="shadow text-center">
<Card.Body>
<h6>Indian Cases</h6>
<h4>{summary.confirmedCasesIndian}</h4>
</Card.Body>
</Card>
</Col>

<Col md={4}>
<Card className="shadow text-center">
<Card.Body>
<h6>Foreign Cases</h6>
<h4>{summary.confirmedCasesForeign}</h4>
</Card.Body>
</Card>
</Col>

<Col md={4}>
<Card className="shadow text-center">
<Card.Body>
<h6>Unidentified</h6>
<h4>{summary.confirmedButLocationUnidentified}</h4>
</Card.Body>
</Card>
</Col>

</Row>

{/* TABLE */}

<Card className="shadow">

<Card.Body>

<h5 className="mb-3">State Wise Data</h5>

<Table bordered hover responsive>

<thead className="table-dark">

<tr>
<th>State</th>
<th>Total Confirmed</th>
<th>Indian Cases</th>
<th>Foreign Cases</th>
<th>Recovered</th>
<th>Deaths</th>
</tr>

</thead>

<tbody>

{regional.map((item,index)=>(

<tr key={index}>

<td>{item.loc}</td>
<td>{item.totalConfirmed}</td>
<td>{item.confirmedCasesIndian}</td>
<td>{item.confirmedCasesForeign}</td>
<td>{item.discharged}</td>
<td>{item.deaths}</td>

</tr>

))}

</tbody>

</Table>

</Card.Body>

</Card>

</Container>

);

}
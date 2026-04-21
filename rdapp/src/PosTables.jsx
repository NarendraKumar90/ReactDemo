import { Container, Row, Col, Card } from "react-bootstrap";
import tableIcon from './assets/image.png';

export default function PosTable() {

const tables = [
 {id:1,name:"Table 1",total:450},
 {id:2,name:"Table 2",total:200},
 {id:3,name:"Table 3",total:0},
 {id:4,name:"Table 4",total:120},
  {id:1,name:"Table 1",total:450},
 {id:2,name:"Table 2",total:200},
 {id:3,name:"Table 3",total:0},
 {id:4,name:"Table 4",total:120}
];

return(

<Container className="mt-4">

<Row>

{tables.map(table => (

<Col md={3} key={table.id} className="mb-4">

<Card className="text-center shadow-sm p-2">

<img
src={tableIcon}
alt="table"
style={{
width:"120px",
margin:"auto"
}}
/>

<h6 className="mt-2">{table.name}</h6>

<p>Total ₹ {table.total}</p>

</Card>

</Col>

))}

</Row>

</Container>

);

}
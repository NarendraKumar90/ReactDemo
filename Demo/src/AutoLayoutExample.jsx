import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Bootstrp from './Bootstrp';

function AutoLayoutExample() {
  return (
    <Container>
      
      <Row>
        <Col><Bootstrp/></Col>
        <Col><Bootstrp/></Col>
        <Col><Bootstrp/></Col>
      </Row>
    </Container>
  );
}

export default AutoLayoutExample;
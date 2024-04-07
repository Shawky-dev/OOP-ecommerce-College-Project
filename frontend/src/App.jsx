import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Header from './Header'
import LeftSidebar from "./LeftSidebar";
import MainContent from './MainContent';
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/data/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper" style={{ marginTop: "40px" }}>
            <LeftSidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper" style={{ marginTop: "40px" }}>
            <MainContent />
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default App;
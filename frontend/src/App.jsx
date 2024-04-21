import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Header from './Header'
import LeftSidebar from "./LeftSidebar";
import MainContent from './MainContent';
function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
      fetch('http://localhost:8080/items')
          .then(response => response.json())
          .then(data => setItems(data))
          .catch(error => console.error('Error:', error));
  }, []);
  console.log(items)
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper" style={{ marginTop: "40px" }}>
            <LeftSidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper" style={{ marginTop: "40px" }}>
            <MainContent items = {items} />
          </Col>
        </Row>
      </Container>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
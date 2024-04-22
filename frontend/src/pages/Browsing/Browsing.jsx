import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Header from './Header'
import LeftSidebar from "./LeftSidebar";
import MainContent from './MainContent';
function App() {
  const [items, setItems] = useState([]);
  const [searchData, setSearchData] = useState('*');

  const handleSearchUpdate = (newsearchData) => {
    setSearchData(newsearchData);
 };

  useEffect(() => {
      fetch('http://localhost:8080/search/'+searchData)
          .then(response => response.json())
          .then(data => setItems(data))
          .catch(error => console.error('Error:', error));
  }, [searchData]);
  console.log(items)

  return (
    <div>
      <Header onSearchUpdate={handleSearchUpdate}/>
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
    </div>
  );
}

export default App;
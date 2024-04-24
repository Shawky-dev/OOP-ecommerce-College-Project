import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Header from './Header'
import LeftSidebar from "./LeftSidebar";
import MainContent from './MainContent';
function App() {
  const [items, setItems] = useState([]);
  const [searchData, setSearchData] = useState('*');
  const [refresh, setRefresh] = useState(false); // New state to trigger refresh

  const handleSearchUpdate = (newsearchData) => {
    setSearchData(newsearchData);
 };
 const handleDelete = () => {
  setRefresh(prev => !prev); // Toggle the refresh state to trigger a re-fetch
};

useEffect(() => {
  fetch('http://localhost:8080/search/'+searchData)
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error:', error));
}, [searchData, refresh]);

  return (
    <div>
      <Header onSearchUpdate={handleSearchUpdate}/>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper" style={{ marginTop: "40px" }}>
            <LeftSidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper" style={{ marginTop: "40px" }}>
            <MainContent items={items} onDelete={handleDelete} /> {/* Pass down the handleDelete function */}
          </Col>
        </Row>
      </Container>
    </div>
 );
}

export default App;
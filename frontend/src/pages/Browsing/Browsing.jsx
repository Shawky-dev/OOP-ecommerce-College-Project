import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Header from './Header'
import LeftSidebar from "./LeftSidebar";
import MainContent from './MainContent';
function App() {
  const [items, setItems] = useState([]);
  const [searchData, setSearchData] = useState('*');
  const [searchMethod, setSearchMethod] = useState('search');
  const [refresh, setRefresh] = useState(false); // New state to trigger refresh

  const handleSearchUpdate = (newsearchData,newSearchMethod) => {
    setSearchData(newsearchData);
    setSearchMethod(newSearchMethod)
 };
 const handleDelete = () => {
  setRefresh(prev => !prev); // Toggle the refresh state to trigger a re-fetch
};

useEffect(() => {
  fetch('http://localhost:8080/search/'+searchData, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      method: searchMethod
    })
  })
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
            <LeftSidebar onSearchUpdate={handleSearchUpdate}/>
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
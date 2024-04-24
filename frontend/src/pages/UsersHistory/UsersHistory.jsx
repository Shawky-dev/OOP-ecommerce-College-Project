import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import './UserProfileComponent.css'; // Import the CSS file

const UserProfileComponent = () => {
 const [data, setData] = useState([]);

 useEffect(() => {
    fetch('http://localhost:8080/customers')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
 }, []);

 const handleDeleteUser = (userId) => {
  fetch(`http://localhost:8080/customers/${userId}`, {
    method: 'DELETE',
  })
  .then(() => {
    window.location.reload();
  })
  .catch(error => console.error('Error deleting user:', error));
};

return (
  <Container>
    {data.map((user, index) => (
      <div className="user-profile" key={index}>
        <h2>
          {user.Name}
          <span style={{ float: 'right' }}>
            <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>Delete User</Button>
          </span>
        </h2>
        <p>Email: {user._mail}</p> {/* Display the user's email */}
        {user.ProfilePictureBase64 && (
          <Image src={`data:image/png;base64,${user.ProfilePictureBase64}`} roundedCircle className="profile-picture" />
        )}
        <h3>Current Cart</h3>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {user.userCart.map((item, cartIndex) => (
              <tr key={cartIndex}>
               <td>{item.ID}</td>
               <td>{item.name}</td>
               <td>{item.quantity}</td>
               <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h3>User History</h3>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Price</th>
              <th>Address</th>
              <th>Items Purchased</th>
            </tr>
          </thead>
          <tbody>
            {user.userHistory.map((history, historyIndex) => (
              <React.Fragment key={historyIndex}>
               <tr>
                  <td>{history.Date}</td>
                  <td>{history.TotalPrice}</td>
                  <td>{history.Address}</td>
                  <td>
                    <Table striped bordered hover className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.userCart.map((item, cartIndex) => (
                          <tr key={cartIndex}>
                            <td>{item.ID}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </td>
               </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    ))}
  </Container>
);
};

export default UserProfileComponent;

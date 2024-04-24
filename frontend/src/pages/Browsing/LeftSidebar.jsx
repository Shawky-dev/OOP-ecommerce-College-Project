
import { ListGroup } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <ListGroup>
      <ListGroup.Item action href="#link1">Food</ListGroup.Item>
      <ListGroup.Item action href="#link2">Electronics</ListGroup.Item>
      <ListGroup.Item action href="#link3">Books</ListGroup.Item>
      <ListGroup.Item action href="#link4">Clothing</ListGroup.Item>
      <ListGroup.Item action href="#link5">Furniture</ListGroup.Item>
      <ListGroup.Item action href="#link6">Toys</ListGroup.Item>
    </ListGroup>
  );
}

export default Sidebar;

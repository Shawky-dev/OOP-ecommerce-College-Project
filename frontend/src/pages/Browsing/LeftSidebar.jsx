import { useEffect, useState } from "react";
import { ListGroup } from 'react-bootstrap';

const Sidebar = ({ onSearchUpdate }) => {
  const [searchValue, setSearchValue] = useState('');
   
  const handleSearch = () => {
     if(searchValue){
         onSearchUpdate(searchValue,"category");
         console.log(searchValue,"category");
     } else {
         onSearchUpdate("*","category");
     }
  }
  const onCategoryChange = (e) =>{
     setSearchValue(e); // Use innerText to get the category name
     handleSearch();
  }
 
  return (
     <ListGroup>
       <ListGroup.Item action onClick={(e) => onCategoryChange("*")}>All</ListGroup.Item>
       <ListGroup.Item action onClick={(e) => onCategoryChange(e.target.innerText)}>Food</ListGroup.Item>
       <ListGroup.Item action onClick={(e) => onCategoryChange(e.target.innerText)}>Electronics</ListGroup.Item>
       <ListGroup.Item action onClick={(e) => onCategoryChange(e.target.innerText)}>Books</ListGroup.Item>
       <ListGroup.Item action onClick={(e) => onCategoryChange(e.target.innerText)}>Clothing</ListGroup.Item>
       <ListGroup.Item action onClick={(e) => onCategoryChange(e.target.innerText)}>Furniture</ListGroup.Item>
       <ListGroup.Item action onClick={(e) => onCategoryChange(e.target.innerText)}>Toys</ListGroup.Item>
     </ListGroup>
  );
 
}

export default Sidebar;

import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";

import ItemCard from './ItemCard';


const MainContent = ({items, onDelete}) => {
    return (
        <Container>
            <Row> 
            {items ? (
                <>
                {items.map((card, index) => (
                    <Col key={index} xs={12} md={6} lg={2} style={{marginLeft:"30px"}}>
                        <ItemCard title={card.Name} text={card.Description} ImageBase64={card.ImageBase64} Price={card.Price + "$"} ID={card.ID} Category={card.Category}onDelete={onDelete} /> 
                    </Col>
                ))}
                </>
) : (
<p>no Data received yet</p>
)}
            </Row>
        </Container>
    );
}


export default MainContent;

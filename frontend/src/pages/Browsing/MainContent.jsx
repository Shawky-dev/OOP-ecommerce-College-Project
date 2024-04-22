import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";

import ItemCard from './ItemCard';
const cardsData = [
    {
        title: "Card",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus"
    },
    {
        title: "Card",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ut!"
    }
];

const MainContent = ({items}) => {


    return (
        <Container>
            <Row> 
            {items ? (
                <>
                {items.map((card, index) => (
                    <Col key={index} xs={12} md={6} lg={3}>
            
                        <ItemCard title={card.Name} text={card.Description} ImageBase64={card.ImageBase64} Price={card.Price + "$"} SellerName={card.SellerId} />
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

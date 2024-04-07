import { Container, Row, Col, Card } from 'react-bootstrap';
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

const MainContent = () => {
    return (
        <Container>
            <Row>
                {cardsData.map((card, index) => (
                    <Col key={index} xs={12} md={6} lg={4}>
                        <ItemCard title={card.title + (index + 1)} text={card.text} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MainContent;

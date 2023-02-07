import React from "react";
import { useContext } from "react";
import ApiContext from "./apiProvider";
//css just for the feed
import '../css/feed.css';
//using react bootstrap for speed and clean display 
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const CCard = props => {

    const { title, user_id, thumbnail, creation_type, created } = props.creation;

    const apiProvider = useContext(ApiContext);

    return (
        <Card>
            <Card.Img variant="top" src="../assets/default-creation-thumb.png" />
 
            <Card.Body>
                <Card.Title>{title }</Card.Title>
                <Card.Text>
                    {user_id }
                </Card.Text>
                <Row>
                    <Col><Button size="lg" variant="light"><img src="../assets/heart.png" />Like</Button></Col>
                    <Col><Button size="lg" variant="light">Remix</Button></Col>
                </Row>

            </Card.Body>
        </Card>
    )
}

export default CCard;
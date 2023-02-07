import React from "react";
import { useContext, useEffect, useState} from "react";
import ApiContext from "./apiProvider";
//css just for the feed
import '../css/feed.css';
//using react bootstrap for speed and clean display 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CCard from './creationCard';

const Feed = () => {

    const apiProvider = useContext(ApiContext);
    const [feed, setFeed] = useState(apiProvider.feed);
    useEffect(() => {
        apiProvider.getFeed().then(f => {setFeed(f)})
    });

    if (feed) {
        return (
            <div className="feed-content">
                <Container fluid>
                    <Row xs={1} md={3} className="g-4">
                        {feed.map(function (f) {
                            return (
                                <Col>
                                    <CCard creation={f} />

                                </Col>
                            )
                        })
                        }
                    </Row>
                </Container>
            </div>
        )
    } else {
        return (
            <div className="center">
                <h1>Error when displaying feed</h1>
            </div>
        )
    }
}

export default Feed;
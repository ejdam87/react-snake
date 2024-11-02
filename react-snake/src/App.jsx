import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import GameBoard from "./GameBoard.jsx";

function App()
{
    return (
        <Container className="vh-100">

            <Row>
                <Col className="d-flex justify-content-center">
                    Snake game
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                    <GameBoard />
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                    <Button> Restart </Button>
                </Col>
            </Row>

        </Container>
    )
}

export default App

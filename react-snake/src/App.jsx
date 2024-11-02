import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import GameBoard from "./GameBoard.jsx";

function App()
{

    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState({ x: 0, y: 1 });
    const [gameState, setGameState] = useState("Playing");

    const handleRestart = () => {
        setSnake( [{ x: 10, y: 10 }] );
        setFood( { x: 5, y: 5 } );
        setDirection( { x: 0, y: 1 } );
        setGameState("Playing");
    };

    return (
        <Container className="vh-100">

            <Row>
                <Col className="d-flex justify-content-center">
                    Snake game
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                    {gameState}
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                    <GameBoard
                        snake={snake}
                        setSnake={setSnake}
                        food={food}
                        setFood={setFood}
                        direction={direction}
                        setDirection={setDirection}
                        gameState={gameState}
                        setGameState={setGameState} />
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                    <Button onClick={handleRestart}> Restart </Button>
                </Col>
            </Row>

        </Container>
    )
}

export default App

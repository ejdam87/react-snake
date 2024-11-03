import React from "react";
import { Row, Col, Button } from "react-bootstrap";

import Settings from "./Settings.jsx";

function SidePanel(props)
{
    return (
        <>
            <Row>
                <Col className="text-center mb-4">
                    <Settings
                        gameState={props.gameState}
                        boardSize={props.boardSize}
                        minSize={props.minSize}
                        maxSize={props.maxSize}
                        boardDim={props.boardDim}
                        setBoardSize={props.setBoardSize}
                        setCellSize={props.setCellSize}
                        speed={props.speed}
                        setSpeed={props.setSpeed}
                        maxSpeed={props.maxSpeed}
                    />
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-3">
                    <Button onClick={props.handleRestart}>Restart</Button>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center mb-3">
                    <h2>{props.gameState}</h2>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-center">
                    <p>Score: {props.score}</p>
                </Col>
            </Row>
        </>
    );
};

export default SidePanel;

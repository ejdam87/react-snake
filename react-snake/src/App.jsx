import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import GameBoard from "./GameBoard.jsx";
import Settings from "./Settings.jsx";

function App()
{
    // --- dimensions of grid
    const [boardDim, setBoardDim] = useState( Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.8) );
    const [boardSize, setBoardSize] = useState( 20 );
    const [cellSize, setCellSize] = useState( Math.floor(boardDim / boardSize) );
    // ---

    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState({ x: 0, y: 1 });
    const [gameState, setGameState] = useState("Playing");
    const [canChangeDir, setCanChangeDir] = useState(true);

    const handleKeyPress = (e) => {

        if (!canChangeDir || gameState != "Playing")
        {
            return;
        }

        switch (e.key)
        {
            case "ArrowUp":
                if (direction.y == 0)
                {
                    setDirection({ x: 0, y: -1 });
                }
                break;
            case "ArrowDown":
                if (direction.y == 0)
                {
                    setDirection({ x: 0, y: 1 });
                }
                break;
            case "ArrowLeft":
                if (direction.x == 0)
                {
                    setDirection({ x: -1, y: 0 });
                }
                break;
            case "ArrowRight":
                if (direction.x == 0)
                {
                    setDirection({ x: 1, y: 0 });
                }
                break;
            default: break;
        }

        setCanChangeDir(false);
        setTimeout(() => {setCanChangeDir(true)}, 50);

    };

    const outOfBounds = (head) =>
    {
        return head.x >= boardSize || head.x < 0 || head.y >= boardSize || head.y < 0;
    }

    const moveSnake = () => {

        if (gameState != "Playing")
        {
            return;
        }

        const newHead = {
            x: (snake[0].x + direction.x),
            y: (snake[0].y + direction.y),
        };

        if (outOfBounds(newHead) || snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y))
        {
            setGameState("Game over!");
            return;
        }

        const newSnake = [newHead, ...snake];

        if (newHead.x === food.x && newHead.y === food.y)
        {
            setFood(generateFood());
        }
        else
        {
            newSnake.pop();
        }
        setSnake(newSnake);
    };

    const generateFood = () => {
        const allPositions = [];
        for (let x = 0; x < boardSize; x++)
        {
            for (let y = 0; y < boardSize; y++)
            {
                allPositions.push({ x, y });
            }
        }

        const freePositions = allPositions.filter(
            (pos) => !snake.some((segment) => segment.x === pos.x && segment.y === pos.y)
        );

        const randomIndex = Math.floor(Math.random() * freePositions.length);
        return freePositions[randomIndex];
    };

    const handleRestart = () => {
        setSnake( [{ x: 10, y: 10 }] );
        setFood( { x: 5, y: 5 } );
        setDirection( { x: 0, y: 1 } );
        setGameState("Playing");
    };

    useEffect(() => {
        const handleResize = () => {
            const newDim = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.8);
            setBoardDim( newDim );
            setCellSize( Math.floor(newDim / boardSize) );
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect( () => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {document.removeEventListener('keydown', handleKeyPress);};
    }, [direction, canChangeDir, gameState] );

    useEffect(() => {
        const interval = setInterval(moveSnake, 80);
        return () => {clearInterval(interval);};
    }, [snake, direction, gameState]);

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
                <Col sm={12} md={9} lg={9} className="d-flex justify-content-center">
                    <GameBoard
                        snake={snake}
                        food={food}
                        boardSize={boardSize}
                        cellSize={cellSize}
                    />
                </Col>
                <Col sm={12} md={3} lg={3}>
                    <Row>
                        <Col className="text-center">
                            <Settings
                                gameState={gameState}
                                boardSize={boardSize}
                                boardDim={boardDim}
                                setBoardSize={setBoardSize}
                                setCellSize={setCellSize}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <Button onClick={handleRestart}> Restart </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default App

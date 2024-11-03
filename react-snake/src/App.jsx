import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./sketchy.bootstrap.min.css";

import GameBoard from "./GameBoard.jsx";
import SidePanel from "./SidePanel.jsx";

function App()
{
    const MAX_SPEED = 200;
    const MIN_SIZE = 5;
    const MAX_SIZE = 60;
    const INIT_COUNTDOWN = 3;
    const INIT_SPEED = 100;
    const INIT_SIZE = 20;

    const [boardDim, setBoardDim] = useState(Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.8));
    const [boardSize, setBoardSize] = useState(INIT_SIZE);   // 20x20 grid by default
    const [cellSize, setCellSize] = useState(Math.floor(boardDim / boardSize));
    const [speed, setSpeed] = useState(INIT_SPEED);
    const [snake, setSnake] = useState([{x: 2, y: 1}]);
    const [food, setFood] = useState({x: 4, y: 4});
    const [score, setScore] = useState(0);
    const [direction, setDirection] = useState({ x: 0, y: 1 });
    const [gameState, setGameState] = useState(`Start in ${INIT_COUNTDOWN}`);
    const [canChangeDir, setCanChangeDir] = useState(true);
    const [countDown, setCountDown] = useState(INIT_COUNTDOWN);

    const randInt = (n) => {
        return Math.floor(Math.random() * n);
    };

    const outOfBounds = (head) => {
        return head.x >= boardSize || head.x < 0 || head.y >= boardSize || head.y < 0;
    };

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
            setScore( score + 1 );
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
        setTimeout(() => {setCanChangeDir(true)}, Math.floor((MAX_SPEED - speed)));
    };

    const handleRestart = () => {
        setSnake([{ x: randInt(boardSize - 1), y: randInt(boardSize - 1) }]);
        setFood(generateFood());
        setDirection({ x: 0, y: 1 });
        setScore(0);
        setGameState(`Start in ${INIT_COUNTDOWN}`)
        setCountDown(INIT_COUNTDOWN);
    };

    const handleResize = () => {
        const newDim = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.8);
        setBoardDim(newDim);
        setCellSize(Math.floor(newDim / boardSize));
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {document.removeEventListener('keydown', handleKeyPress);};
    }, [direction, canChangeDir, gameState, speed]);

    useEffect(() => {
        const interval = setInterval(moveSnake, MAX_SPEED - speed);
        return () => {clearInterval(interval);};
    }, [snake, direction, gameState, speed]);

    useEffect(() => {
        if (countDown == 0)
        {
            setGameState("Playing");
        }
        else
        {
            const tid = setTimeout(() => {
                setGameState(`Start in ${countDown - 1}`)
                setCountDown(countDown - 1);
            }, 1000);
            return () => clearTimeout(tid);
        }
    }, [countDown]);

    return (
        <Container className="vh-100">

            <Row>
                <Col className="d-flex justify-content-center m-3">
                    <h1>Snake game</h1>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={8} lg={8} className="d-flex justify-content-center">
                    <GameBoard
                        snake={snake}
                        food={food}
                        boardSize={boardSize}
                        cellSize={cellSize}
                    />
                </Col>
                <Col sm={12} md={4} lg={4} className="d-flex flex-column justify-content-center mt-3">
                    <SidePanel
                        gameState={gameState}
                        boardSize={boardSize}
                        minSize={MIN_SIZE}
                        maxSize={MAX_SIZE}
                        boardDim={boardDim}
                        setBoardSize={setBoardSize}
                        setCellSize={setCellSize}
                        speed={speed}
                        setSpeed={setSpeed}
                        maxSpeed={MAX_SPEED}
                        score={score}
                        handleRestart={handleRestart}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default App

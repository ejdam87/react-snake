import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";

const BOARD_SIZE = 20;
const CELL_SIZE = 20;

function GameBoard()
{
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 5, y: 5 });
    const [direction, setDirection] = useState({ x: 0, y: 1 });

    const handleKeyPress = (e) => {
        switch (e.key)
        {
            case "ArrowUp": setDirection({ x: 0, y: -1 }); break;
            case "ArrowDown": setDirection({ x: 0, y: 1 }); break;
            case "ArrowLeft": setDirection({ x: -1, y: 0 }); break;
            case "ArrowRight": setDirection({ x: 1, y: 0 }); break;
            default: break;
        }
    };

    useEffect(() => {
        const interval = setInterval(moveSnake, 100);
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            clearInterval(interval);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [snake, direction]);

    const moveSnake = () => {
        const newHead = {
            x: (snake[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
            y: (snake[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
        };

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
    for (let x = 0; x < BOARD_SIZE; x++)
    {
        for (let y = 0; y < BOARD_SIZE; y++)
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

  return (
    <Stage
        width={BOARD_SIZE * CELL_SIZE}
        height={BOARD_SIZE * CELL_SIZE}
        style={{
            border: '4px solid black',
            borderRadius: '5px',
            boxSizing: 'border-box'
        }}
    >
        <Layer>
            {snake.map((segment, i) => (
                <Rect
                    key={i}
                    x={segment.x * CELL_SIZE}
                    y={segment.y * CELL_SIZE}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    fill="green"
                />
            ))}

            <Rect
                x={food.x * CELL_SIZE}
                y={food.y * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill="red"
            />
        </Layer>
    </Stage>
    );
};

export default GameBoard;

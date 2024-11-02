import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";

const BOARD_SIZE = 20;
const CELL_SIZE = 20;

function GameBoard(props)
{
    const [canChangeDir, setCanChangeDir] = useState(true);

    const handleKeyPress = (e) => {

        if (!canChangeDir || props.gameState != "Playing")
        {
            return;
        }

        switch (e.key)
        {
            case "ArrowUp":
                if (props.direction.y == 0)
                {
                    props.setDirection({ x: 0, y: -1 });
                }
                break;
            case "ArrowDown":
                if (props.direction.y == 0)
                {
                    props.setDirection({ x: 0, y: 1 });
                }
                break;
            case "ArrowLeft":
                if (props.direction.x == 0)
                {
                    props.setDirection({ x: -1, y: 0 });
                }
                break;
            case "ArrowRight":
                if (props.direction.x == 0)
                {
                    props.setDirection({ x: 1, y: 0 });
                }
                break;
            default: break;
        }

        setCanChangeDir(false);
        setTimeout(() => {setCanChangeDir(true)}, 80);

    };

    useEffect(() => {
        const interval = setInterval(moveSnake, 100);
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            clearInterval(interval);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [props.snake, props.direction, props.gameState]);

    const outOfBounds = (head) =>
    {
        return head.x >= BOARD_SIZE * CELL_SIZE || head.x < 0 || head.y >= BOARD_SIZE * CELL_SIZE || head.y < 0;
    }

    const moveSnake = () => {

        if (props.gameState != "Playing")
        {
            return;
        }

        const newHead = {
            x: (props.snake[0].x + props.direction.x * CELL_SIZE),
            y: (props.snake[0].y + props.direction.y * CELL_SIZE),
        };

        if (outOfBounds(newHead) || props.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y))
        {
            props.setGameState("Game over!");
            return;
        }

        const newSnake = [newHead, ...props.snake];

        if (newHead.x === props.food.x && newHead.y === props.food.y)
        {
            props.setFood(generateFood());
        }
        else
        {
            newSnake.pop();
        }

        props.setSnake(newSnake);
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
        (pos) => !props.snake.some((segment) => segment.x === pos.x && segment.y === pos.y)
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
            {props.snake.map((segment, i) => (
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
                x={props.food.x * CELL_SIZE}
                y={props.food.y * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill="red"
            />
        </Layer>
    </Stage>
    );
};

export default GameBoard;

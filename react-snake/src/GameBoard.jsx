import React from "react";
import { Stage, Layer, Rect } from "react-konva";

function GameBoard(props)
{
    return (
    <Stage
        width={props.boardSize * props.cellSize}
        height={props.boardSize * props.cellSize}
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
                    x={segment.x * props.cellSize}
                    y={segment.y * props.cellSize}
                    width={props.cellSize}
                    height={props.cellSize}
                    fill="green"
                />
            ))}

            <Rect
                x={props.food.x * props.cellSize}
                y={props.food.y * props.cellSize}
                width={props.cellSize}
                height={props.cellSize}
                fill="red"
            />
        </Layer>
    </Stage>
    );
};

export default GameBoard;

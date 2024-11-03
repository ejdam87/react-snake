import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import { Card } from "react-bootstrap";

function GameBoard(props)
{
    return (
        <Card>
            <Stage
                width={props.boardSize * props.cellSize}
                height={props.boardSize * props.cellSize}
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
        </Card>
    );
};

export default GameBoard;

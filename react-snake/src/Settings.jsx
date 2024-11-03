import React from "react";
import { Form } from "react-bootstrap";

function Settings(props)
{
    return (
        <Form>
            <Form.Label>Game speed</Form.Label>
            <Form.Range
                disabled={props.gameState == "Playing"}
            />

            <Form.Label>Number of grid cells</Form.Label>
            <Form.Range
                disabled={props.gameState == "Playing"}
                min={20}
                max={60}
                value={props.boardSize}
                onChange={ (e) => {
                    props.setBoardSize(e.target.value);
                    props.setCellSize(props.boardDim / e.target.value);
                } }
            />
        </Form>
    );
};

export default Settings;

import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConstructionOutlined } from "@mui/icons-material";


export default function ViewTasks() {

    const [dataForMapping, setDataForMapping] = useState([]);
    const url = 'http://localhost:4000/todo';

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                setDataForMapping(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);


    const handleDeleteTask = (taskId) => {
        axios.delete(`http://localhost:4000/todo/${taskId}`)
            .then((response) => {
                const updatedData = dataForMapping.filter((task) => task.id !== taskId);
                setDataForMapping(updatedData);
                console.log(response);
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Done</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataForMapping.map((task) => (
                            <TableRow
                                key={task.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {task.id}
                                </TableCell>
                                <TableCell align="right">{task.title}</TableCell>
                                <TableCell align="right">{task.description}</TableCell>
                                <TableCell align="right">{task.done ? <DoneIcon color="primary" /> : <ClearIcon color="error" />}</TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        <DeleteIcon /> Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
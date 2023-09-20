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
import { Link } from 'react-router-dom';



export default function ViewTasks() {

    const [dataForMapping, setDataForMapping] = useState([]);
    const url = 'http://localhost:4000/todo';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(url)
            .then((response) => {
                setDataForMapping(response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleMarkAsDone = (taskId) => {
        const taskToMarkAsDone = dataForMapping.find((task) => task.id === taskId);

        if (taskToMarkAsDone) {
            taskToMarkAsDone.done = true;
            axios.post(`http://localhost:4000/todo/${taskId}`, taskToMarkAsDone)
                .then((response) => {
                    console.log("Task marked as done:", response.data);
                    fetchData();
                })
                .catch((error) => {
                    console.error("Error marking task as done:", error);
                });
        }
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
                                        color="primary"
                                        onClick={() => handleMarkAsDone(task.id)}
                                        disabled={task.done}
                                    >
                                        Mark as Done
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/view-task/${task.id}`}>
                                        <Button variant="outlined" color="secondary">
                                            View Task
                                        </Button>
                                    </Link>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
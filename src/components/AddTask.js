import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState } from 'react';


export default function AddTask() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const url = 'http://localhost:4000/todo';

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post(url, {
            id: data.get('id'),
            title: data.get('title'),
            description: data.get('description'),
            done: data.get('done') === 'true'
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem("jwt", response.data);
        }).catch((error) => {
            console.log("err");
        })

        setTitle('');
        setDescription('');

    };

    return (
        <>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            name="title"
                            label="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="description"
                            label="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Task
                        </Button>
                    </Box>
                </Container>
        </>
    )
}
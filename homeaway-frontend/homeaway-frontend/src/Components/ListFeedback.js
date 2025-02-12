import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiServices from '../apiServices/apiServices';

export default function ListFeedback() {
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            const data = await apiServices.getAllFeedback();
            setFeedbackList(data);
            console.log(data)
        };

        fetchFeedback();
    }, []);

    return (
        <div>
            <h1 style={{ marginTop: "5rem" }}>User Feedback</h1>
            <div className="feedback-container container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Feedback</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {feedbackList.length > 0 ? (
                                feedbackList.map((feedback) => (
                                    <TableRow key={feedback.id}>
                                        <TableCell align="center">{feedback.user.name}</TableCell>
                                        <TableCell align="center">{feedback.user.username}</TableCell>
                                        <TableCell align="center">{feedback.user.email}</TableCell>
                                        <TableCell align="center">{feedback.user.number}</TableCell>
                                        <TableCell align="center">{feedback.feedback}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No feedback available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

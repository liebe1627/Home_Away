import React, { useEffect, useState } from 'react'
import apiServices from '../apiServices/apiServices'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function ListUsers() {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await apiServices.getAllUsers();
                setUsers(data.filter(user => user.utype !== "ADMIN"));
                // setTotalPages(data.totalPages);
                console.log(data)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        
        fetchAllUsers();
    }, []);
    console.log(users)

    return (
        <div>
            <h1 style={{ marginTop: "5rem" }}>User List</h1>
            <div className="users-container container">
                <TableContainer component={Paper}>
                    <Table>
                        {/* Table Head */}
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">User Type</TableCell>
                            </TableRow>
                        </TableHead>
                        
                        {/* Table Body */}
                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell align="center">{user.id}</TableCell>
                                        <TableCell align="center">{user.name}</TableCell>
                                        <TableCell align="center">{user.username}</TableCell>
                                        <TableCell align="center">{user.number}</TableCell>
                                        <TableCell align="center">{user.email}</TableCell>
                                        <TableCell align="center">{user.utype}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No users available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            
            {/* Pagination */}
            {/* <Stack spacing={2} style={{ alignItems: 'center', marginTop: "20px" }}>
                <Pagination
                    count={totalPages}
                    showFirstButton
                    showLastButton
                    page={page + 1} 
                    onChange={(event, value) => setPage(value - 1)}
                />
            </Stack> */}
        </div>
    );
}

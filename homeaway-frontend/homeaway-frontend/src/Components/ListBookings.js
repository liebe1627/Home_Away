import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiServices from '../apiServices/apiServices';

export default function ListBookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await apiServices.getAllBookings();
            
            if (!Array.isArray(data)) {
                console.error("Expected an array but got:", data);
                setBookings([]); // Set empty array to prevent crashes
                return;
            }
    
            const bookingsWithOwners = await Promise.all(
                data.map(async (booking) => {
                    const ownerId = booking.properties.owner;
                    const ownerData = await apiServices.getUserById(ownerId); // Fetch owner details
                    return { 
                        ...booking, 
                        ownerName: ownerData.name 
                    };
                })
            );

            setBookings(bookingsWithOwners);
        };

        fetchBookings();
    }, []);

    return (
        <div>
            <h1 style={{ marginTop: "5rem" }}>List of Bookings</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Username</TableCell>
                            {/* <TableCell align="center">Email</TableCell> */}
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Property Name</TableCell>
                            <TableCell align="center">City</TableCell>
                            <TableCell align="center">State</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Owner Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell align="center">{booking.users[0]?.username}</TableCell>
                                    {/* <TableCell align="center">{booking.users[0]?.email}</TableCell> */}
                                    <TableCell align="center">{booking.users[0]?.number}</TableCell>
                                    <TableCell align="center">{booking.properties.name}</TableCell>
                                    <TableCell align="center">{booking.properties.city}</TableCell>
                                    <TableCell align="center">{booking.properties.state}</TableCell>
                                    <TableCell align="center">{booking.time}</TableCell>
                                    <TableCell align="center">{booking.date}</TableCell>
                                    <TableCell align="center">{booking.status}</TableCell>
                                    <TableCell align="center">{booking.ownerName}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} align="center">
                                    No bookings available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

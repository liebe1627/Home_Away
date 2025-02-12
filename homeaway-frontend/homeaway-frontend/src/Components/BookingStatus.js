import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiServices from '../apiServices/apiServices';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


export default function BookingStatus() {

    const [id, setId] = useState(localStorage.getItem("userId"))
    const [bookingDetails, setBookingDetails] = useState({})
    const [ownerBookingDetails, setOwnerBookingDetails] = useState({})
    const [ownerDetils, setOwnerDetails] = useState({})
    const [userType, setUserType] = useState(useSelector((state) => state.utype.value))
    useEffect(() => {

        const fetchBookingUserDetails = async () => {
            const data = await apiServices.getAllBookingsByUserId(id);
            setBookingDetails(data)
        }

        const fetchBookingOwnerDetails = async () => {
            try {
                const data = await apiServices.getAllBookingsByOwnerId(id);
                
                if (Array.isArray(data)) {
                    setOwnerBookingDetails(data); // ✅ Set only if it's an array
                } else {
                    console.error("Expected an array but got:", data);
                    setOwnerBookingDetails([]); // ✅ Fallback to an empty array
                }
            } catch (error) {
                console.error("Error fetching owner bookings:", error);
                setOwnerBookingDetails([]); // ✅ Handle API errors gracefully
            }
        }

        if (userType === "OWNER") {
            fetchBookingOwnerDetails()
        }
        else if (userType === "USER") {
            fetchBookingUserDetails()
        }
        else {
            console.log(`Admin`)
        }

    }, [id])

    useEffect(() => {
        const fetchOwnerDetails = async () => {
            if (Array.isArray(bookingDetails) && bookingDetails.length > 0) {
                try {
                    // Extract unique owner IDs
                    const uniqueOwnerIds = [
                        ...new Set(bookingDetails.map((booking) => booking.properties?.owner).filter(Boolean))
                    ];
    
                    // Fetch details for all unique owners
                    const ownerDataResponses = await Promise.all(
                        uniqueOwnerIds.map((ownerId) => apiServices.getUserById(ownerId))
                    );
    
                    // Map owner IDs to their details
                    const ownerDataMap = uniqueOwnerIds.reduce((acc, ownerId, index) => {
                        acc[ownerId] = ownerDataResponses[index];
                        return acc;
                    }, {});
    
                    console.log("Fetched Owner Details:", ownerDataMap);
                    setOwnerDetails(ownerDataMap);
                } catch (error) {
                    console.error("Error fetching owner details:", error);
                }
            }
        };
    
        fetchOwnerDetails();
    }, [bookingDetails]);
    
    // console.log(ownerDetils)
    console.log(bookingDetails)
    // console.log(bookingDetails[0]?.users[0]?.id)

    // const navigate = useNavigate();
    const handleUpdateStatus = async (id) => {
        const data = await apiServices.updateBookingStatus(id);
        console.log(data)
    }

    const renderTableRow = () => {
        switch (userType) {
            case "USER":
                return (
                    <TableBody>
                         {Array.isArray(bookingDetails) && bookingDetails.length > 0 ? (
        bookingDetails
            .filter(booking => booking.status !== "COMPLETED")
            .map((booking, index) => (
                <TableRow key={index}>
                    <TableCell align="center">{booking.properties?.name || "N/A"}</TableCell>
                    <TableCell align="center">{ownerDetils[booking.properties.owner]?.name || "Fetching..."}</TableCell>
                    <TableCell align="center">{booking.properties?.city || "N/A"}</TableCell>
                    <TableCell align="center">{booking.properties?.state || "N/A"}</TableCell>
                    <TableCell align="center">{booking.time || "N/A"}</TableCell>
                    <TableCell align="center">{booking.date || "N/A"}</TableCell>
                </TableRow>
            ))
    ) : (
        <TableRow>
            <TableCell colSpan={6} align="center">
                No bookings available.
            </TableCell>
        </TableRow>
    )}
                    </TableBody>
                )
            case "OWNER":
                return (
                    <TableBody>
                        {ownerBookingDetails.length > 0 ? (
                            ownerBookingDetails
                                .filter(booking => booking.status !== "COMPLETED") // 🔥 Remove COMPLETED bookings
                                .map((booking, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{booking.properties?.name || "N/A"}</TableCell>
                                        {/* <TableCell align="center">{ownerDetils?.name || "Fetching..."}</TableCell> */}

                                        {userType === "USER" ? (
                                            <TableCell align="center">{ownerDetils?.name || "Fetching..."}</TableCell>
                                        ) : (
                                            <TableCell align="center">{booking.users?.[0]?.name || "N/A"}</TableCell>
                                        )}
                                        {userType === "USER" ? (
                                            <TableCell align="center">{booking.properties?.city || "N/A"}</TableCell>
                                        ) : (
                                            <TableCell align="center">{booking.users?.[0]?.number || "N/A"}</TableCell>
                                        )}

                                        {userType === "USER" ? (
                                            <TableCell align="center">{booking.properties?.state || "N/A"}</TableCell>
                                        ) : (
                                            <TableCell align="center">{booking.users?.[0]?.email || "N/A"}</TableCell>
                                        )}

                                        <TableCell align="center">{booking.time || "N/A"}</TableCell>
                                        <TableCell align="center">{booking.date || "N/A"}</TableCell>
                                        <TableCell align="center">{booking.status || "N/A"}</TableCell>

                                        {userType === "OWNER" && (
                                            <TableCell align="center">
                                                <Button variant="outlined" onClick={() => handleUpdateStatus(booking.id)}>
                                                    Update
                                                </Button>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    No bookings available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                )
            default:
                return (<div></div>)
        }


    }

    return (
        <div>
            {/* <Navbar /> */}

            <div class="properties-container container" style={{ "margin-top": "5rem" }}>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Property Name</TableCell>
                                {
                                    userType === "OWNER" ? (
                                        <TableCell align="center">Customer</TableCell>
                                    ) : (
                                        <TableCell align="center">Owner</TableCell>
                                    )
                                }
                                {
                                    userType === "USER" ? (
                                        <TableCell align="center">City</TableCell>
                                    ) : (
                                        <TableCell align="center">Phone</TableCell>
                                    )
                                }
                                {
                                    userType === "USER" ? (
                                        <TableCell align="center">State</TableCell>
                                    ) : (
                                        <TableCell align="center">Email</TableCell>
                                    )
                                }
                                <TableCell align="center">Time</TableCell>
                                <TableCell align="center">Date</TableCell>
                                {
                                    userType === "OWNER" ? (
                                        <TableCell align="center">Status</TableCell>
                                    ) : (
                                        <></>
                                    )
                                }
                                {
                                    userType === "OWNER" ? (
                                        <TableCell align="center">Update Status</TableCell>
                                    ) : (
                                        <></>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        {renderTableRow()}
                    </Table>
                </TableContainer>

            </div>
        </div>
    )
}

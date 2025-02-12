import React from 'react'
import p1 from "../Static/Images/p1.jpg"
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import apiServices from '../apiServices/apiServices';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function Properties() {
    const [userType, setUserType] = useState(useSelector((state) => state.utype.value));
    const [propertiesOfOwner, setPropertiesOfOwner] = useState([])
    const [bookings, setBookings] = useState([])
    const [properties, setProperties] = useState([])
    const [size, setSize] = useState(6)
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    useEffect(() => {
        const fetchPropertiesOfOwner = async () => {

            const data = await apiServices.getPropertiesOfTheOwner(localStorage.getItem("userId"), page, size)
            setPropertiesOfOwner(data.content);
            setTotalPages(data.totalPages)
            console.log(data)
        }

        if (userType === "OWNER") {
            fetchPropertiesOfOwner()
        }

        const fetchAllProperties = async () => {
            const data = await apiServices.getAllProperties(page, size)
            console.log(data)
            setProperties(data.content)
            setTotalPages(data.totalPages)
        }

        if (userType === "USER") {
            fetchAllProperties()
        }

        const fetchAllBookings = async () => {
            const data = await apiServices.getAllBookings();
            setBookings(data);
        }

        if (userType === "ADMIN") {
            fetchAllBookings()
        }
    }, [page, size])
    console.log(propertiesOfOwner)

    const renderHeadings = () => {
        switch (userType) {
            case "USER":
                return (
                    <div class="heading">
                        <span></span>
                        <h2>Our Featured Properties</h2>
                        <p>The best Selling and most demanded<br />properties that every broker recommends.</p>
                    </div>
                );
            case "ADMIN":
                return (
                    <div class="heading">
                        <span></span>
                        <h2>Your Latest Bookings</h2>
                    </div>
                );
            case "OWNER":
                return (
                    <div class="heading">
                        <span></span>
                        <h2>Your Properties</h2>
                        <p>Showcase your listed properties and attract the right buyers and renters.</p>
                    </div>
                );
            default:
                return (
                    <div class="heading">
                        <span></span>
                        <h2>Our Featured Properties</h2>
                        <p>The best Selling and most demanded<br />properties that every broker recommends.</p>
                    </div>
                )
        }
    }

    const renderProperties = () => {
        // console.log(userType)
        switch (userType) {
            case "USER":
                return (
                    <div class="properties-container container" style={{ "margin-top": "15px" }}>
                        {
                            properties.map((propst, index) => (
                                <div class="box" key={index}>
                                    <Link class="propdetails" to={`/propertyDtails/${propst.id}`}>
                                        <img src={p1} alt="" />
                                        <h3>{propst.name}</h3>
                                        <div class="content">
                                            <div class="text">
                                                <h3>{propst.state}</h3>
                                                <p>{propst.city}</p>
                                            </div>
                                            <div class="icon">
                                                <i class='bx bxs-bed' ><span>-/{propst.rent}</span></i>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }


                    </div>
                );
            case "ADMIN":
                return (
                    <div className="properties-container container" style={{ marginTop: "15px" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="booking table">
                                {/* Table Header */}
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Property Name</TableCell>
                                        <TableCell align="center">Owner Name</TableCell>
                                        {/* <TableCell align="center">Owner Email</TableCell> */}
                                        <TableCell align="center">Customer</TableCell>
                                        <TableCell align="center">Customer Email</TableCell>
                                        <TableCell align="center">Time</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                    </TableRow>
                                </TableHead>

                                {/* Table Body */}
                                <TableBody>
                                    {bookings.length > 0 ? (
                                         bookings.slice(0, 5).map((record) => (
                                            <TableRow key={record.id}>
                                              <TableCell align="center">{record.properties.name}</TableCell>
                                              <TableCell align="center">{record.properties.owner}</TableCell>
                                              <TableCell align="center">
                                                {record.users.length > 0 ? record.users[0].name : "N/A"}
                                              </TableCell>
                                              <TableCell align="center">
                                                {record.users.length > 0 ? record.users[0].email : "N/A"}
                                              </TableCell>
                                              <TableCell align="center">{record.time}</TableCell>
                                              <TableCell align="center">{record.date}</TableCell>
                                              <TableCell align="center">{record.status}</TableCell>
                                            </TableRow>
                                          ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                No bookings available.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                );
            case "OWNER":
                return (
                    <div className="properties-container container" style={{ marginTop: "15px" }}>
    {Array.isArray(propertiesOfOwner) && propertiesOfOwner.length > 0 ? (
        propertiesOfOwner.map((props, index) => (
            <div className="box" key={index}>
                <Link className="propdetails" to={`/propertyDtails/${props.id}`}>
                    <img src={p1} alt="" />
                    <h3>{props.name}</h3>
                    <div className="content">
                        <div className="text">
                            <h3>{props.state}</h3>
                            <p>{props.city}</p>
                        </div>
                        <div className="icon">
                            <i className="bx bxs-bed"><span>-/{props.rent}</span></i>
                        </div>
                    </div>
                </Link>
            </div>
        ))
    ) : (
        <p>No properties available.</p> 
    )}
</div>
                );
            default:
                return (
                    <div class="properties-container container" style={{ "margin-top": "15px" }}>
                        <div class="box">
                            <a class="propdetails" href="">
                                <img src={p1} alt="" />
                                <h3></h3>
                                <div class="content">
                                    <div class="text">
                                        <h3></h3><br />
                                        <p></p>
                                    </div>
                                    <div class="icon">
                                        <i class='bx bxs-bed' ><span>1</span></i>
                                        <i class='bx bxs-dish' ><span>1</span></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="box">
                            <a class="propdetails" href="">
                                <img src={p1} alt="" />
                                <h3></h3>
                                <div class="content">
                                    <div class="text">
                                        <h3></h3><br />
                                        <p></p>
                                    </div>
                                    <div class="icon">
                                        <i class='bx bxs-bed' ><span>1</span></i>
                                        <i class='bx bxs-dish' ><span>1</span></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="box">
                            <a class="propdetails" href="">
                                <img src={p1} alt="" />
                                <h3></h3>
                                <div class="content">
                                    <div class="text">
                                        <h3></h3><br />
                                        <p></p>
                                    </div>
                                    <div class="icon">
                                        <i class='bx bxs-bed' ><span>1</span></i>
                                        <i class='bx bxs-dish' ><span>1</span></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="box">
                            <a class="propdetails" href="">
                                <img src={p1} alt="" />
                                <h3></h3>
                                <div class="content">
                                    <div class="text">
                                        <h3></h3><br />
                                        <p></p>
                                    </div>
                                    <div class="icon">
                                        <i class='bx bxs-bed' ><span>1</span></i>
                                        <i class='bx bxs-dish' ><span>1</span></i>
                                    </div>
                                </div>
                            </a>
                        </div><div class="box">
                            <a class="propdetails" href="">
                                <img src={p1} alt="" />
                                <h3></h3>
                                <div class="content">
                                    <div class="text">
                                        <h3></h3><br />
                                        <p></p>
                                    </div>
                                    <div class="icon">
                                        <i class='bx bxs-bed' ><span>1</span></i>
                                        <i class='bx bxs-dish' ><span>1</span></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="box">
                            <a class="propdetails" href="">
                                <img src={p1} alt="" />
                                <h3></h3>
                                <div class="content">
                                    <div class="text">
                                        <h3></h3><br />
                                        <p></p>
                                    </div>
                                    <div class="icon">
                                        <i class='bx bxs-bed' ><span>10</span></i>
                                        <i class='bx bxs-dish' ><span>1</span></i>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                );
        }
    }

    return (
        <div>
            <section class="properties container" id="properties">
                {renderHeadings()}
                {renderProperties()}
                <br />
                {/* <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <span>Page {page + 1} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1}>
                    Next
                </button> */}
                {/* </div> */}

                <Stack spacing={2} style={{ 'align-items': 'center' }}>
                    <Pagination count={totalPages} showFirstButton showLastButton page={page + 1}
                        onChange={(event, value) => setPage(value - 1)} />
                </Stack>
            </section>
        </div>
    )
}

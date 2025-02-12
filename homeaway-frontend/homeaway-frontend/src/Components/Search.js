import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import apiServices from '../apiServices/apiServices';
import p1 from "../Static/Images/p1.jpg"

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [properties, setProperties] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    // Function to fetch properties based on search query
    const fetchProperties = async (page = 0) => {
        try {
            let data;
            if (searchQuery.trim()) {
                // Fetch filtered properties if search query is present
                data = await apiServices.searchProperty(searchQuery);
            } else {
                // Fetch all properties when no search query is provided
                data = await apiServices.getAllProperties(page,size);
            }
            
            console.log(data);
            setSize(data.totalPages)
            setProperties(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    // Fetch all properties on component mount
    useEffect(() => {
        fetchProperties();
    }, [page]); // Fetch when page changes

    // Handle search input change
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle form submission
    const handleSearch = (event) => {
        event.preventDefault();
        fetchProperties();
    };

    return (
        <div>
            <h1 style={{ marginTop: "5rem" }}>Search Properties</h1>
            <div className="container">
                <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        id="search-query"
                        label="Enter Search Query (Property Name, Facility, Rent, City, State)"
                        sx={{ width: '100%' }}
                        variant="standard"
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    <Button variant="outlined" style={{ marginLeft: "1rem" }} endIcon={<SearchIcon />} type="submit">
                        Search
                    </Button>
                </Box>

                {/* Display Properties */}
                <section className="properties container" id="properties" style={{marginTop:"3rem"}}>
                    <div className="properties-container container" style={{ marginTop: "15px" }}>
                        {Array.isArray(properties) && properties.length > 0 ? (
                            properties.map((props, index) => (
                                <div className="box" key={index}>
                                    <Link className="propdetails" to={`/propertyDtails/${props.id}`}>
                                        <img src={p1} alt="Property" />
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

                    {/* Pagination */}
                    {/* <Stack spacing={2} style={{ alignItems: 'center' }}>
                        <Pagination
                            count={totalPages}
                            showFirstButton
                            showLastButton
                            page={page + 1}
                            onChange={(event, value) => {
                                setPage(value - 1);
                                fetchProperties(value - 1);
                            }}
                        />
                    </Stack> */}
                </section>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import regimg from '../Static/Images/p6.jpg';
import BadgeIcon from '@mui/icons-material/Badge';
import apiServices from '../apiServices/apiServices'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HouseIcon from '@mui/icons-material/House';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DomainIcon from '@mui/icons-material/Domain';
import AddLocationIcon from '@mui/icons-material/AddLocation';  
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { useNavigate } from 'react-router-dom';

export default function AddProperty() {


    const [facilities, setFacilities] = useState([])
    const navigate = useNavigate();
    const [selectedFacillities, setSelectedFacilities] = useState([])
    const [propertyDetails, setPropertyDetails] = useState({
        name: "",
        city: "",
        state: "",
        add1: "",
        add2: "",
        rent: 0,
        owner: 0,
        facilities:[]
    })
    useEffect(() => {
        const fetchFacilities = async () => {
            const data = await apiServices.getFacilities()
            setFacilities(data);
            console.log(data)
        }
        fetchFacilities()
    }, [])

    const handleClick = (facilityName) => {
        console.log(selectedFacillities)
        setSelectedFacilities((prevSelected) =>
            prevSelected.includes(facilityName)
                ? prevSelected.filter((name) => name !== facilityName)
                : [...prevSelected, facilityName]
        );
    };

    const onChange = (event) => {
        const { value, name } = event.target
        setPropertyDetails({...propertyDetails,[name]:value})
    }

    const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedProperty = {
        ...propertyDetails,
        facilities: selectedFacillities, // Add selected facilities
        owner: localStorage.getItem("userId") // Set owner ID
    };

    console.log("Updated Property:", updatedProperty); // Debugging log

    const data = await apiServices.addNewProperty(updatedProperty);
    console.log(data);
    if(data){
        alert("Property Added Successfully")
        navigate("/")
    }
};


    return (
        <div>
            <div className="contain" style={{marginTop:"3rem"}}>
                <div className="main-heading">
                    <h1>Add New Property!</h1>
                </div>
                <section className="addProperty container" id="addProperty">
                    <div className="addProperty-img">
                        <img src={regimg} alt="" />
                    </div>
                    <div className="addProperty-text">
                        <form action="" method="post" className='form-design'>

                            <label htmlFor="">House Name</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="Enter House Name" sx={{ width: '100%' }} variant="standard" name="name" value={propertyDetails.name} onChange={onChange}/>
                            </Box>
                            <br />
                            <label htmlFor="">City</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <LocationCityIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl variant="standard" sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
                                    <Select
                                        sx={{ width: '100%' }}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                          value={propertyDetails.city}
                                          onChange={onChange}
                                          name='city'
                                        label="Age"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Pune">Pune</MenuItem>
                                        <MenuItem value="Mumbai">Mumbai</MenuItem>
                                        <MenuItem value="Miraz">Miraz</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <br />
                            <label htmlFor="">State</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <DomainIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <FormControl variant="standard" sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                                    <Select
                                        sx={{ width: '100%' }}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                          value={propertyDetails.state}
                                          onChange={onChange}
                                          name="state"
                                        label="Age"
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                                        {/* <MenuItem value="">Twenty</MenuItem> */}
                                        {/* <MenuItem value="">Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>
                            </Box>
                            <br />
                            <label htmlFor="">Address Line 1</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <MyLocationIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Address Line 1"
                                    multiline
                                    maxRows={4}
                                    name='add1'
                                    onChange={onChange}
                                    value={propertyDetails.add1}
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                />
                            </Box>
                            <br />
                            <label htmlFor="">Address Line 2</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <MyLocationIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Address Line 2"
                                    multiline
                                    maxRows={4}
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                    name='add2'
                                    onChange={onChange}
                                    value={propertyDetails.add2}
                                />
                            </Box>
                            <br />
                            <label htmlFor="">Rent Amount</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <CurrencyRupeeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" type='number' label="Enter Rent Amount" sx={{ width: '100%' }} variant="standard" name='rent' onChange={onChange} value={propertyDetails.rent} />
                            </Box>
                            <br />
                            <label htmlFor="">Facilities</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <MiscellaneousServicesIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <Stack direction="row" sx={{
                                    flexWrap: "wrap",
                                    gap: "8px",
                                    maxWidth: "100%"
                                }}>
                                    {facilities.map((chip, index) => (
                                        <Chip label={chip.name} variant='outlined' onClick={() => handleClick(chip.name)}
                                            color={selectedFacillities.includes(chip.name) ? "primary" : "default"}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                            <br /><br />

                            <Button variant="outlined" endIcon={<HouseIcon />} onClick={handleSubmit} type='submit'>
                                Add Property
                            </Button>
                        </form>
                    </div>
                </section>
            </div >
        </div >
    )
}

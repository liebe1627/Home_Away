// import React, { useState } from 'react'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import PersonIcon from '@mui/icons-material/Person';
// import PasswordIcon from '@mui/icons-material/Password';
// import Button from '@mui/material/Button';
// import regimg from '../Static/Images/p6.jpg';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormLabel from '@mui/material/FormLabel';
// import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
// import BadgeIcon from '@mui/icons-material/Badge';
// import apiServices from '../apiServices/apiServices'
// import HowToRegIcon from '@mui/icons-material/HowToReg';

// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Routes
// } from "react-router-dom";

// export default function Register() {

//     const [userDetails,setUserDetails]=useState({
//         name: "",
// 		username: "",
// 		password:"",
// 		number: 0,
// 		email: "",
// 		utype: ""
//     })

//     const handleChange=(event)=>{
//         const{name,value}=event.target;
//         setUserDetails({...userDetails,[name]:value});
//     }

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(userDetails);
//         try{
//             const data = await apiServices.addNewUser(userDetails);
//             console.log(data);
//         }
//         catch(err){
//             console.log(`You got an error while adding the new user ${err}`);
//         }
//     }
//     return (
//         <div>
//             <div className="contain">
//                 <div className="main-heading">
//                     <h1>Register!</h1>
//                     <p>Welcome to Home Away</p>
//                 </div>
//                 <section className="register container" id="register">
//                     <div className="register-img">
//                         <img src={regimg} alt="" />
//                     </div>
//                     <div className="register-text">
//                         <form action="" method="post" className='form-design'>

//                         <label htmlFor="">Name</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//                                 <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" label="Enter Name" sx={{ width: '100%' }} variant="standard" onChange={handleChange} name='name' value={userDetails.name}/>
//                             </Box>
//                             <br />
//                             <label htmlFor="">Username</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//                                 <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" label="Enter Username" sx={{ width: '100%' }} variant="standard" onChange={handleChange} name='username' value={userDetails.username}/>
//                             </Box>
//                             <br />
//                             <label htmlFor="">Password</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                                 <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" type='password' label="Enter password" sx={{ width: '100%' }} variant="standard" onChange={handleChange} name='password' value={userDetails.password}/>
//                             </Box>
//                             <br />
//                             <FormLabel id="demo-row-radio-buttons-group-label">User Type</FormLabel>
//                             <RadioGroup
//                                 row
//                                 aria-labelledby="demo-row-radio-buttons-group-label"
//                                 onChange={handleChange} name='utype' value={userDetails.utype}
//                             >
//                                 <FormControlLabel value="OWNER" control={<Radio />} label="House Owner" />
//                                 <FormControlLabel value="USER" control={<Radio />} label="User" />
//                             </RadioGroup>
//                             <br />
//                             <label htmlFor="">Phone</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//                                 <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" type='number' label="Enter Phone Number" sx={{ width: '100%' }} variant="standard" onChange={handleChange} name='number' value={userDetails.number}/>
//                             </Box>
//                             <br />
//                             <label htmlFor="">Email</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//                                 <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" type='email' label="Enter Email" sx={{ width: '100%' }} variant="standard" onChange={handleChange} name='email' value={userDetails.email}/>
//                             </Box>
//                             <br /><br />
                            
//                             <Button variant="outlined" endIcon={<HowToRegIcon />} type='submit' onClick={handleSubmit}>
//                                 register
//                             </Button>
//                         </form>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import regimg from '../Static/Images/p6.jpg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BadgeIcon from '@mui/icons-material/Badge';
import apiServices from '../apiServices/apiServices';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FormHelperText from '@mui/material/FormHelperText';

export default function Register() {

    const [userDetails, setUserDetails] = useState({
        name: "",
        username: "",
        password: "",
        number: "",
        email: "",
        utype: ""
    });

    const [errors, setErrors] = useState({
        name: false,
        username: false,
        password: false,
        number: false,
        email: false,
        utype: false
    });

    const [passwordError, setPasswordError] = useState("");

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });

        // Clear error when user starts typing
        setErrors({ ...errors, [name]: false });

        if (name === "password") {
            if (!validatePassword(value)) {
                setPasswordError("Password must have 1 uppercase, 1 number, 1 special character, and be at least 8 characters long.");
                setErrors({ ...errors, password: true });
            } else {
                setPasswordError("");
                setErrors({ ...errors, password: false });
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        let newErrors = {
            name: userDetails.name === "",
            username: userDetails.username === "",
            password: !validatePassword(userDetails.password),
            number: !/^\d{9}$/.test(userDetails.number),  // Phone number must be exactly 9 digits
            email: !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userDetails.email),  // Email must end with @gmail.com
            utype: userDetails.utype === ""
        };
    
        setErrors(newErrors);
    
        if (Object.values(newErrors).some(error => error)) {
            return;
        }
    
        console.log(userDetails);
        try {
            const data = await apiServices.addNewUser(userDetails);
            console.log(data);
        } catch (err) {
            console.log(`You got an error while adding the new user ${err}`);
        }
    };
    

    return (
        <div>
            <div className="contain">
                <div className="main-heading">
                    <h1>Register!</h1>
                    <p>Welcome to Home Away</p>
                </div>
                <section className="register container" id="register">
                    <div className="register-img">
                        <img src={regimg} alt="" />
                    </div>
                    <div className="register-text">
                        <form className='form-design'>

                            <label>Name</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    error={errors.name}
                                    helperText={errors.name ? "Name cannot be empty" : ""}
                                    label="Enter Name"
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                    onChange={handleChange}
                                    name='name'
                                    value={userDetails.name}
                                />
                            </Box>
                            <br />

                            <label>Username</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    error={errors.username}
                                    helperText={errors.username ? "Username cannot be empty" : ""}
                                    label="Enter Username"
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                    onChange={handleChange}
                                    name='username'
                                    value={userDetails.username}
                                />
                            </Box>
                            <br />

                            <label>Password</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    error={errors.password}
                                    label="Enter Password"
                                    type='password'
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                    onChange={handleChange}
                                    name='password'
                                    value={userDetails.password}
                                    helperText={passwordError}
                                />
                            </Box>
                            <br />

                            <FormLabel>User Type</FormLabel>
                            <RadioGroup
                                row
                                onChange={handleChange}
                                name='utype'
                                value={userDetails.utype}
                            >
                                <FormControlLabel value="OWNER" control={<Radio />} label="House Owner" />
                                <FormControlLabel value="USER" control={<Radio />} label="User" />
                            </RadioGroup>
                            {errors.utype && <FormHelperText error>Please select a user type</FormHelperText>}
                            <br />

                            <label>Phone</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    error={errors.number}
                                    helperText={errors.number ? "Phone number cannot be empty, Must have 9 digits" : ""}
                                    label="Enter Phone Number"
                                    type='number'
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                    onChange={handleChange}
                                    name='number'
                                    value={userDetails.number}
                                />
                            </Box>
                            <br />

                            <label>Email</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    error={errors.email}
                                    helperText={errors.email ? "Email cannot be empty, Must end with @gmail.com" : ""}
                                    label="Enter Email"
                                    type='email'
                                    sx={{ width: '100%' }}
                                    variant="standard"
                                    onChange={handleChange}
                                    name='email'
                                    value={userDetails.email}
                                />
                            </Box>
                            <br /><br />

                            <Button variant="outlined" endIcon={<HowToRegIcon />} type='submit' onClick={handleSubmit}>
                                Register
                            </Button>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}

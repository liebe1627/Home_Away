// import React,{useState} from 'react'
// import loginjpg from '../Static/Images/p3.jpg'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import PersonIcon from '@mui/icons-material/Person';
// import PasswordIcon from '@mui/icons-material/Password';
// import LoginIcon from '@mui/icons-material/Login';
// import Button from '@mui/material/Button';
// import { useSelector,useDispatch } from 'react-redux';
// import { updateUTypeAdmin,updateUTypeOwner,resetUType } from '../Redux/UserTypeSlice';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Routes
//   } from "react-router-dom";
// import apiServices from '../apiServices/apiServices';

// export default function Login(props) {

    
//     const [userDetails,setUserDetails]=useState({
// 		username: "",
// 		password:"",
//     })

//     const handleChange=(event)=>{
//         const{name,value}=event.target;
//         setUserDetails({...userDetails,[name]:value});
//     }

    

//     const utype= useSelector((state)=>state.utype.value)
//     console.log(utype);
//     const dispatch=useDispatch();

//     const handleSubmit= async (event)=>{
//         event.preventDefault();
//         console.log(userDetails)
//         try{
//             const data = await apiServices.getUserByUsernameAndPassword(userDetails)
//             console.log(data)
//             if(data!==""){
//                 if(data.user.utype==="OWNER"){
//                     dispatch(updateUTypeOwner())
//                     props.status(true)
//                     localStorage.setItem("token", data.token);
//                     localStorage.setItem("userId",data.user.id)
//                     localStorage.setItem("isLogin",true)
//                     localStorage.setItem("userTyp","OWNER")
//                 }
//                 else if(data.user.utype==="ADMIN"){
//                     dispatch(updateUTypeAdmin())
//                     props.status(true)
//                     localStorage.setItem("token", data.token);
//                     localStorage.setItem("userId",data.user.id)
//                     localStorage.setItem("isLogin",true)
//                     localStorage.setItem("userTyp","ADMIN")
//                 }
//                 else{
//                     dispatch(resetUType())
//                     props.status(true)
//                     localStorage.setItem("token", data.token);
//                     localStorage.setItem("userId",data.user.id)
//                     localStorage.setItem("isLogin",true)
//                     localStorage.setItem("userTyp","USER")
//                 }
//             }
//             else{
//                 console.log("Wrong username or password")
//             }

//         }
//         catch(err){
//             console.log(err.response.target)
//         }
//     }

//     return (
//         <div>
//             <div className="contain">
//                 <div className="main-heading">
//                     <h1>Login!</h1> 
//                     <p>Welcome to Home Away</p>
//                 </div>
//                 <section className="login container" id="login">
//                     <div className="login-img">
//                         <img src={loginjpg} alt="" />
//                     </div>
//                     <div className="login-text">
//                         <form action="" method="post" className='form-design'>
//                             <label htmlFor="">Username</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//                                 <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" label="Enter Username" sx={{ width: '100%' }} variant="standard" name="username" value={userDetails.username} onChange={handleChange} />
//                             </Box>
//                             <br />
//                             <label htmlFor="">Password</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                                 <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-with-sx" label="Enter password" type='password' sx={{ width: '100%' }} variant="standard" name="password" value={userDetails.password} onChange={handleChange}/>
//                             </Box>
//                             <div className="divforget">
//                                 <div className='forgetpassleft'></div>
//                                 <Link to="/forgetPassword" className='forgetpass'>Forget Password?</Link>
//                             </div>
//                             <br /><br />
//                             <Button variant="outlined" endIcon={<LoginIcon />} type='submit' onClick={handleSubmit}>
//                                 Login
//                             </Button>
//                         </form>
//                         <br />
//                             Not Registered Yet?<Link to="/register">Register</Link>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react';
import loginjpg from '../Static/Images/p3.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateUTypeAdmin, updateUTypeOwner, resetUType } from '../Redux/UserTypeSlice';
import { Link } from "react-router-dom";
import apiServices from '../apiServices/apiServices';

export default function Login(props) {
    const [userDetails, setUserDetails] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: false, password: false, message: "" });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });

        // Reset errors when the user starts typing
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false, message: "" }));
    };

    const validateFields = () => {
        let isValid = true;
        let newErrors = { username: false, password: false, message: "" };

        if (!userDetails.username.trim()) {
            newErrors.username = true;
            isValid = false;
        }
        if (!userDetails.password.trim()) {
            newErrors.password = true;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userDetails)

        if (!validateFields()) return;

        try {
            const data = await apiServices.getUserByUsernameAndPassword(userDetails);
            console.log(data)
            if (data && data.user) {
                // Save token and user info based on type
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("isLogin", "true");

                if (data.user.utype === "OWNER") {
                    dispatch(updateUTypeOwner());
                    localStorage.setItem("userTyp", "OWNER");
                } else if (data.user.utype === "ADMIN") {
                    dispatch(updateUTypeAdmin());
                    localStorage.setItem("userTyp", "ADMIN");
                } else {
                    dispatch(resetUType());
                    localStorage.setItem("userTyp", "USER");
                }
                props.status(true);
            } else {
                setErrors({ username: true, password: true, message: "Invalid username or password" });
                setUserDetails({ username: "", password: "" });
            }
        } catch (err) {
            setErrors({ username: true, password: true, message: "Invalid username or password" });
            setUserDetails({ username: "", password: "" });
        }
    };

    return (
        <div>
            <div className="contain">
                <div className="main-heading">
                    <h1>Login!</h1>
                    <p>Welcome to Home Away</p>
                </div>
                <section className="login container" id="login">
                    <div className="login-img">
                        <img src={loginjpg} alt="" />
                    </div>
                    <div className="login-text">
                        <form className='form-design' onSubmit={handleSubmit}>
                            <label>Username</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="username"
                                    label="Enter Username"
                                    variant="standard"
                                    name="username"
                                    value={userDetails.username}
                                    onChange={handleChange}
                                    error={errors.username}
                                    helperText={errors.username ? "Username cannot be empty" : ""}
                                    fullWidth
                                />
                            </Box>
                            <br />
                            <label>Password</label><br />
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    id="password"
                                    label="Enter Password"
                                    type="password"
                                    variant="standard"
                                    name="password"
                                    value={userDetails.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    helperText={errors.password ? "Password cannot be empty" : ""}
                                    fullWidth
                                />
                            </Box>
                            <div className="divforget">
                                <div className='forgetpassleft'></div>
                                <Link to="/forgetPassword" className='forgetpass'>Forget Password?</Link>
                            </div>
                            <br /><br />
                            {errors.message && (
                                <p style={{ color: "red", textAlign: "center" }}>{errors.message}</p>
                            )}
                            <Button variant="outlined" endIcon={<LoginIcon />} type="submit">
                                Login
                            </Button>
                        </form>
                        <br />
                        Not Registered Yet? <Link to="/register">Register</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

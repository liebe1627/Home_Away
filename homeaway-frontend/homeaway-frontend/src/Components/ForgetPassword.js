// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import PersonIcon from '@mui/icons-material/Person';
// import PasswordIcon from '@mui/icons-material/Password';
// import Button from '@mui/material/Button';
// import apiServices from '../apiServices/apiServices';
// import loginjpg from '../Static/Images/p3.jpg'


// export default function ForgetPassword() {
//     const navigate = useNavigate();

//     const [passwordDetails, setPasswordDetails] = useState({
//         username: "",
//         password: "",
//     });

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setPasswordDetails({ ...passwordDetails, [name]: value });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         console.log(passwordDetails)
//         try {
//             const response = await apiServices.updatePassword(passwordDetails);
//             if (response === true) {
//                 navigate('/');
//             } else {
//                 console.log("Password update failed");
//             }
//         } catch (err) {
//             console.error("Error updating password:", err);
//         }
//     };

//     return (
//         // <div className="contain">
//         //     <div className="main-heading">
//         //         <h1>Reset Password</h1>
//         //         <p>Enter your details to reset your password</p>
//         //     </div>
//         //     <section className="login container" id="login">
//         //         <div className="login-text">
//         //             <form className='form-design'>
//         //                 <label>Username</label><br />
//         //                 <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//         //                     <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         //                     <TextField id="input-username" label="Enter Username" sx={{ width: '100%' }} variant="standard" name="username" value={passwordDetails.username} onChange={handleChange} />
//         //                 </Box>
//         //                 <br />
//         //                 <label>New Password</label><br />
//         //                 <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//         //                     <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//         //                     <TextField id="input-password" label="Enter New Password" type='password' sx={{ width: '100%' }} variant="standard" name="password" value={passwordDetails.password} onChange={handleChange} />
//         //                 </Box>
//         //                 <br /><br />
//         //                 <Button variant="outlined" type='submit' onClick={handleSubmit}>
//         //                     Reset Password
//         //                 </Button>
//         //             </form>
//         //         </div>
//         //     </section>
//         // </div>
//         <div>
//             <div className="contain">
//                 <div className="main-heading">
//                     <h1>Forget Password!</h1>
//                     <p>Reset Your Password</p>
//                 </div>
//                 <section className="login container" id="login">
//                     <div className="login-img">
//                         <img alt="" src={loginjpg} />
//                     </div>
//                     <div className="login-text">
//                         <form action="" method="post" className='form-design'>
//                             <label>Username</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
//                                 <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-username" label="Enter Username" sx={{ width: '100%' }} variant="standard" name="username" value={passwordDetails.username} onChange={handleChange} />
//                             </Box>
//                             <br />
//                             <br />
//                             <label>New Password</label><br />
//                             <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                                 <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                                 <TextField id="input-password" label="Enter New Password" type='password' sx={{ width: '100%' }} variant="standard" name="password" value={passwordDetails.password} onChange={handleChange} />
//                             </Box>
//                             <br /><br />
//                             <Button variant="outlined" type='submit' onClick={handleSubmit}>
//                                 Reset Password
//                             </Button>
//                         </form>
//                     </div>
//                 </section>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import Button from '@mui/material/Button';
import apiServices from '../apiServices/apiServices';
import loginjpg from '../Static/Images/p3.jpg'

export default function ForgetPassword() {
    const navigate = useNavigate();
    
    const [passwordDetails, setPasswordDetails] = useState({
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
    });

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordDetails({ ...passwordDetails, [name]: value });

        let errorMessage = "";
        if (!value) {
            errorMessage = "This field is required";
        } else if (name === "password" && !validatePassword(value)) {
            errorMessage = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
        }

        setErrors({ ...errors, [name]: errorMessage });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = {};
        let isValid = true;

        Object.keys(passwordDetails).forEach((key) => {
            if (!passwordDetails[key]) {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        });

        if (!validatePassword(passwordDetails.password)) {
            newErrors.password = "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character";
            isValid = false;
        }
        
        setErrors(newErrors);
        if (!isValid) return;

        try {
            console.log(passwordDetails)
            const response = await apiServices.updatePassword(passwordDetails);
            console.log(response)
            if (response === true) {
                navigate('/'); // Redirect to Login Page
            } else {
                console.log("Password update failed");
            }
        } catch (err) {
            console.error("Error updating password:", err);
        }
    };

    return (
        <div className="contain">
            <div className="main-heading">
                <h1>Reset Password</h1>
                <p>Enter your details to reset your password</p>
            </div>
            <section className="login container" id="login">
            <div className="login-img">
                        <img alt="" src={loginjpg} />
                         </div>
                <div className="login-text">
                    <form className='form-design'>
                        <label>Username</label><br />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                id="input-username" 
                                label="Enter Username" 
                                sx={{ width: '100%' }} 
                                variant="standard" 
                                name="username" 
                                value={passwordDetails.username} 
                                onChange={handleChange} 
                                error={!!errors.username} 
                                helperText={errors.username}
                            />
                        </Box>
                        <br />
                        <label>New Password</label><br />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                id="input-password" 
                                label="Enter New Password" 
                                type='password' 
                                sx={{ width: '100%' }} 
                                variant="standard" 
                                name="password" 
                                value={passwordDetails.password} 
                                onChange={handleChange} 
                                error={!!errors.password} 
                                helperText={errors.password}
                            />
                        </Box>
                        <br /><br />
                        <Button 
                            variant="outlined" 
                            type='submit' 
                            onClick={handleSubmit} 
                            disabled={!passwordDetails.username || !passwordDetails.password || errors.password}
                        >
                            Reset Password
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}

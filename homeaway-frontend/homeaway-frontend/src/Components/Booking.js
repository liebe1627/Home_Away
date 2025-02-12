import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import BadgeIcon from '@mui/icons-material/Badge';
import apiServices from '../apiServices/apiServices'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import dayjs from 'dayjs';

export default function Booking() {

    const location = useLocation()
    const [id, setId] = useState(location.state?.houseId);
    // console.log(id)
    const [propertyDetail, setPropertyDetail] = useState({})
    const [userDetails, setUserDetails] = useState({})
    useEffect(() => {
      const fetchProperty = async () => {
        const data = await apiServices.getPropertyById(id)
        setPropertyDetail(data)
        console.log(data)
      }
      fetchProperty()

      const fetchUser= async () =>{
        const data =  await apiServices.getUserById(localStorage.getItem("userId"))
        setUserDetails(data)
        // console.log(data)
      }
      fetchUser()
    }, [id])
    const [bookingDetails,setBookingDetails] = useState ({
        userId: 0,
        time: "",
        date: "",
        propertyId: 0
    })

    useEffect(() => {
        if (userDetails && propertyDetail) {
            setBookingDetails({
                userId: userDetails.id,
                time: "",
                date: "",
                propertyId: id
            });
        }
    }, [userDetails, propertyDetail, id]);

    const handleTimeChange = (newTime) => {
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          time: newTime ? newTime.format('HH:mm') : '',
        }));
      };
    
      const handleDateChange = (newDate) => {
        setBookingDetails((prevDetails) => ({
          ...prevDetails,
          date: newDate ? newDate.format('YYYY-MM-DD') : '',
        }));
      };
    
      const handlePayment = () => {

        var options = {
            key: "rzp_test_59kx4Ejznqabde",
            key_secret: "eT5KvSSodPjKfL58JTx9ZxCL",
            currency: "INR",
            amount: 1000,
            name: userDetails.name,
            // description: item.owner,
            handler: async function (response) {
                console.log("Payment Successful:", response);
                await handleSubmit();
            },
            prefill: {
              name: "HomeAway",
              email: "omkarnagnure@gmail.com",
              contact: "8390829546",
            },
            notes: {
              address: "IACSD CDAC pune, Maharastra",
            },
            theme: {
              color: "#3399cc",
            },
          };
          var pay = new window.Razorpay(options);
          const resp = pay.open();
          console.log(resp);
    };

    const handleSubmit= async (event)=>{
        event.preventDefault();
        console.log(bookingDetails)
        const data = await apiServices.addBooking(bookingDetails)
        console.log(data)
        if(data){
            alert("Booking Successful")
            
        }
    }
    return (
        <div>
            <div style={{marginTop:"5rem"}}>
                <div className="contain">
                    <div className="main-heading">
                        <h1>Booking</h1>
                        <p>Book a visit at your convenient time.</p>
                    </div>
                    <section className="register container" id="register">
                        <div className="register-img">
                            <img alt=" Not Avaliable " />
                        </div>
                        <div className="register-text">
                            <form action="" method="post" className='form-design'>

                                <label htmlFor="">Name</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                    <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" slotProps={{
                                        input: {
                                            readOnly: true,
                                        }
                                        
                                    }} value={userDetails.name} sx={{ width: '100%' }} variant="standard" />
                                </Box>
                                <br />
                                <label htmlFor="">Username</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" value={userDetails.username} slotProps={{
                                        input: {
                                            readOnly: true,
                                        }
                                    }}  sx={{ width: '100%' }} variant="standard" />
                                </Box>
                                <br />
                                <label htmlFor="">House Name</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" slotProps={{
                                        input: {
                                            readOnly: true,
                                        }
                                    }} value={propertyDetail.name} aria-readonly sx={{ width: '100%' }} variant="standard" />
                                </Box>
                                <br />
                                <label htmlFor="">City</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" slotProps={{
                                        input: {
                                            readOnly: true,
                                        }
                                    }} value={propertyDetail.city} aria-readonly sx={{ width: '100%' }} variant="standard" />
                                </Box>
                                <br />
                                <label htmlFor="">State</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                    <ContactPhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" type='text' slotProps={{
                                        input: {
                                            readOnly: true,
                                        }
                                    }} value={propertyDetail.state} sx={{ width: '100%' }} variant="standard" />
                                </Box>
                                <br />
                                <label htmlFor="">Full Address</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                    <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <TextField id="input-with-sx" type='email' slotProps={{
                                        input: {
                                            readOnly: true,
                                        }
                                    }} value={`${propertyDetail.add1}, ${propertyDetail.add2}`} sx={{ width: '100%' }} variant="standard" />
                                </Box>
                                <br />

                                <label htmlFor="">Time</label><br />

                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                    <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            sx={{ width: '100%' }} // Ensures proper alignment
                                            label="With Time Clock"
                                            slotProps={{
                                                textField: { variant: "standard" }
                                            }}
                                            value={bookingDetails.time ? dayjs(bookingDetails.time, 'HH:mm') : null}
                                            onChange={handleTimeChange}
                                            minTime={dayjs().set('hour',9).set('minute',0)}
                                            maxTime={dayjs().set('hour',18).set('minute',0)}
                                            viewRenderers={{
                                                hours: renderTimeViewClock,
                                                minutes: renderTimeViewClock,
                                                seconds: renderTimeViewClock,
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <br />
                                <label htmlFor="">Date</label><br />
                                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                                    <AlternateEmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Controlled picker"
                                            slotProps={{
                                                textField: { variant: "standard" }
                                            }}
                                            disablePast="true"
                                            sx={{ width: '100%' }}
                                            value={bookingDetails.date ? dayjs(bookingDetails.date) : null}
                                            onChange={handleDateChange}
                                        />
                                    </LocalizationProvider>
                                </Box>
                                <br />

                                <Button variant="outlined" endIcon={<HowToRegIcon />} type='submit'  onClick={handleSubmit}>
                                    register
                                </Button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import apiServices from '../apiServices/apiServices';

export default function Feedback() {
    const [feedbackDetails, setFeedbackDetails] = useState({
        userId: localStorage.getItem("userId") || "",
        feedback: ""
    });
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setFeedbackDetails({ ...feedbackDetails, feedback: event.target.value });
        setError(""); // Reset error when typing
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!feedbackDetails.feedback.trim()) {
            setError("Feedback cannot be empty");
            return;
        }

        try {
            console.log(feedbackDetails)
            const data=await apiServices.addFeedback(feedbackDetails);
            if(data){
                alert("Feedback submitted successfully!");
                setFeedbackDetails({ ...feedbackDetails, feedback: "" }); // Reset feedback field
            }
            else{
                alert("Failed to submit feedback. Please try again.");
            }
        } catch (err) {
            setError("Failed to submit feedback. Please try again.");
        }
    };

    return (
        <div className="contain" style={{marginTop:"5rem"}}>
            <div className="main-heading">
                <h1>Feedback</h1>
                <p>We value your feedback!</p>
            </div>
            <section className="feedback container" id="feedback">
                <div className="feedback-text">
                    <form className='form-design' onSubmit={handleSubmit}>
                        <label>Your Feedback</label><br />
                        <Box sx={{ width: '100%' }}>
                            <TextField
                                id="feedback"
                                label="Enter your feedback"
                                multiline
                                rows={4}
                                variant="standard"
                                name="feedback"
                                value={feedbackDetails.feedback}
                                onChange={handleChange}
                                error={!!error}
                                helperText={error}
                                fullWidth
                            />
                        </Box>
                        <br />
                        <Button variant="contained" endIcon={<SendIcon />} type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </section>
        </div>
    );
}

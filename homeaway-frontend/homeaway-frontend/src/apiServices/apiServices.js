import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080", 
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const apiServices = {
    getAllUsers: async () => {
        try {
            const resp = await api.get(`/user/getAllUsers`);
            return resp.data;
        } catch (err) {
            console.error(`An error occurred while fetching users: ${err}`);
        }
    },

    addNewUser: async (user) => {
        try {
            const resp = await api.post(`/user/register`, user);
            return resp.data;
        } catch (err) {
            console.error(`An error occurred while adding a new user: ${err.response.data}`);
            return err.response.data;
        }
    },

    getUserByUsernameAndPassword: async (loginData) => {
        try {
            const resp = await api.post(`/user/userLogin`, loginData);
            return resp.data;
        } catch (err) {
            console.error(`There was an error during login: ${err.response.data}`);
            return err.response.data;
        }
    },

    getUserById: async (userId) => {
        try {
            const resp = await api.get(`/user/userById/${userId}`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching user: ${err.response.data}`);
            return err.response.data;
        }
    },

    getFacilities: async () => {
        try {
            const resp = await api.get(`/property/facilities`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching facilities: ${err.response.data}`);
            return err.response.data;
        }
    },

    addNewProperty: async (propDetail) => {
        try {
            const resp = await api.post('/property/addProperty', propDetail);
            return resp.data;
        } catch (err) {
            console.error(`Error adding property: ${err.response.data}`);
            return err.response.data;
        }
    },

    getPropertiesOfTheOwner: async (ownerId, page, size) => {
        try {
            const resp = await api.post(`/property/getPropertiesByUserId/${ownerId}?page=${page}&size=${size}`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching properties: ${err.response.data}`);
            return err.response.data;
        }
    },

    getAllProperties: async (page, size) => {
        try {
            const resp = await api.get(`/property/getAllProperties?page=${page}&size=${size}`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching properties: ${err.response.data}`);
            return err.response.data;
        }
    },

    getPropertyById: async (id) => {
        try {
            const resp = await api.get(`/property/getPropertyById/${id}`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching property: ${err.response.data}`);
            return err.response.data;
        }
    },

    addBooking: async (bookingData) => {
        try {
            console.log(localStorage.getItem("token"))
            const resp = await api.post(`/booking/addBooking`, bookingData,{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        });
            return resp.data;
        } catch (err) {
            console.log(localStorage.getItem("token"))
            console.error(`Error adding booking: ${err.response.data}`);
            return err.response.data;
        }
    },

    getAllBookings: async () => {
        try {
            const resp = await api.get(`/booking/getAllBookings`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching bookings: ${err.response.data}`);
            return err.response.data;
        }
    },

    getAllBookingsByUserId: async (userId) => {
        try {
            const resp = await api.get(`/booking/getBookingsByUserId/${userId}`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching user bookings: ${err.response.data}`);
            return err.response.data;
        }
    },

    getAllBookingsByOwnerId: async (userId) => {
        try {
            const resp = await api.get(`/booking/getBookingsByOwnerId/${userId}`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching owner bookings: ${err.response.data}`);
            return err.response.data;
        }
    },

    updateBookingStatus: async (bookingId) => {
        try {
            const resp = await api.put(`/booking/updateBookingStatus/${bookingId}`);
            return resp.data;
        } catch (err) {
            console.error(`Error updating booking status: ${err.response.data}`);
            return err.response.data;
        }
    },

    getAllFeedback: async () => {
        try {
            const resp = await api.get(`/feedbacks/getAllFeedback`);
            return resp.data;
        } catch (err) {
            console.error(`Error fetching feedback: ${err.response.data}`);
            return err.response.data;
        }
    },
    updatePassword : async(passwordDetail)=>{
        try{
            const resp = await api.put(`/user/forgetPassword`,passwordDetail)
            return resp.data;
        }
        catch (err) {
            console.error(`Error updating the Password: ${err.response.data}`);
            return err.response.data;
        }
    },
    searchProperty : async(searchQuery)=>{
        try{
            const resp = await axios.get(`/property/search`,{params:{query : searchQuery}, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
            return resp.data;
        }
        catch (err) {
            console.error(`Error fetching properties: ${err.response.data}`);
            return err.response.data;
        }
    },
    addFeedback : async(feedbackDetails)=>{
        try{
            const resp = await axios.post(`/feedbacks/addNewFeedback`,feedbackDetails,{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
            })
            return resp.data
        }
        catch (err) {
            console.error(`Error submitting feedback: ${err.response.data}`);
            return err.response.data;
        }
    },
    deleteProperty : async(propId)=>{
        try{
            const resp = await axios.delete(`/property/delete/${propId}`,{
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
        })
            return resp.data
        }
        catch (err) {
            console.error(`Error deleting property: ${err.response.data}`);
            return err.response.data;
        }
    }
};

export default apiServices;
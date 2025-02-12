import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar(props) {

  const [userType, setUserType] = useState(useSelector((state) => state.utype.value));

  const renderNavbar = () => {
    console.log(userType)
    switch (userType) {
      case "USER":
        return (
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
            <li><Link to="/bookingStatus">See All Bookings</Link></li>
            {/* <li><Link to="/viewAllProperties">View All Properties</Link></li> */}

          </ul>
        );
      case "ADMIN":
        return (
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/listProps">Listed Properties</Link></li>
            <li><Link to="/listUsers">Users</Link></li>
            <li><Link to="/listFeedbacks">Feedbacks</Link></li>
            <li><Link to="/listBookings">Bookings</Link></li>
          </ul>
        );
      case "OWNER":
        return (
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/addProperty">Add New Property</Link></li>
            <li><Link to="/bookingStatus">View Bookings</Link></li>
            
          </ul>
        );
      default:
        return (
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add</Link></li>
            <li><Link to="/complaint">Complaint</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/feedback">Feedback</Link></li>
          </ul>
        );
    }
  }

  return (
      <div>
        <header>
          <div className="nav contailer">
            <Link to="/" className="logo"><i className='bx bx-home'></i>Home Away</Link>
            <input type="checkbox" name="" id="menu" />
            <label for="menu"></label>
            {renderNavbar()}
            <Link to="/logout" className="btn">Log Out</Link>
          </div>
        </header>
      </div>
  )
}

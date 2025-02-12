import React, { useState } from 'react'
import about from '../Static/Images/about.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function About() {

  const [userType, setUserType] = useState(useSelector((state) => state.utype.value));

  const renderAbout = () => {
    console.log(userType)
    switch (userType) {
      case "USER":
        return (

          <div className="about-text">
            <p>Get in touch with us to Sell or Rent Your Houses</p>
            <p>Rent a beautiful house for your family.</p>
            <p>Choose from flats in societies, individual </p>
            <p>apartments, bungalows & villas.</p><br />
            <a href="#" className="btn">Learn More</a>
          </div>
        );
      case "ADMIN":
        return (
          <div></div>
        );
      case "OWNER":
        return (
          <div className="about-text">
            <p>List your property with us and find the right tenants or buyers effortlessly.
              Reach thousands of potential renters and buyers in your area.</p>
            <p>Whether it's an apartment, villa, or independent house, get the best offers.
              Enjoy a hassle-free process with verified leads and secure transactions.</p><br />
            <Link to="/addProperty" className="btn">List Your Property</Link>

          </div>
        );
      default:
        return (

          <div className="about-text">
            <p>Get in touch with us to Sell or Rent Your Houses</p>
            <p>Rent a beautiful house for your family.</p>
            <p>Choose from flats in societies, individual </p>
            <p>apartments, bungalows & villas.</p><br />
            <a href="#" className="btn">Learn More</a>
          </div>
        );
    }
  }

  return (
    <div>
      <section className="about container" id="about">
        {userType === "ADMIN" ? (<></>) : (
          <div className="about-img">
            <img src={about} alt="" />
          </div>
        )}
        {renderAbout()}
      </section>
    </div>
  )
}

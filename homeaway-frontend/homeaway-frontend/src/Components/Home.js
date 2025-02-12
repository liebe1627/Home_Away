import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function Home() {
  const [userType, setUserType] = useState(useSelector((state) => state.utype.value));
  const renderHomePage=()=>{
    console.log(userType)

    switch (userType) {
      case "USER":
        return (
          <div class="home-text">
            <h1>Find the Best <br/>Properties <br/>To Live.</h1>
            {/* <a href="Registration.jsp" class="btn">Sign Up</a> */}
        </div>
        );
      case "ADMIN":
        return (
          <div class="home-text">
            <h1>Welcome Back <br/>Omkar <br/></h1>
            {/* <a href="Registration.jsp" class="btn">Sign Up</a> */}
        </div>
        );
      case "OWNER":
        return (
          <div class="home-text">
          <h1>Find the Best <br/>Tenants and <br/>Buyers.</h1>
          {/* <a href="Registration.jsp" class="btn">Sign Up</a> */}
      </div>
        );
      default:
        return (
          <div class="home-text">
            <h1>Find the Best <br/>Properties <br/>To Live.</h1>
            {/* <a href="Registration.jsp" class="btn">Sign Up</a> */}
        </div>
        );
    }

  }

  return (
    <div>
      <section class="home container" id="home">
        <div class="home-text">
            {/* <h1>Find the Best <br/>Properties <br/>To Live.</h1> */}
            {/* <a href="Registration.jsp" class="btn">Sign Up</a> */}
            {renderHomePage()}
        </div>
      </section>
    </div>
  )
}

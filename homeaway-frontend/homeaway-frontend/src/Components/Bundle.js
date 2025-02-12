import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import Properties from './Properties'
import Footer from './Footer'

export default function Bundle() {
    return (
        <div>
            <Home />
            <About />
            <Properties />
            <Footer />
        </div>
    )
}

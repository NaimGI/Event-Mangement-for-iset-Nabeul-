import React, { useEffect, useState,useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./style/navbar.css";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <img src={logo} alt="logo" />
      <nav ref={navRef}>
        <Link to="/">Home</Link> | <Link to="events">Events</Link>
        <a href="https://isetn.rnu.tn/">Institute</a>
        <Link to="about">About Us</Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;

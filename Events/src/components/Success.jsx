import React, { useEffect, useState,useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./style/home.css";
import "./style/success.css";
import Proptypes from "prop-types";

  
  
  function Success(props) {
    const navRef = useRef();

  return (
    <main className="main2">
      <section className="section2">
        <div className="left">
          <p>CONGRATS !</p>
          <h4>
            Your Form was submitted !<br /> Check Your Email For Confirmation.
          </h4>
          <a ref={navRef}>
            <Link to="/events" className="btnH">
              Events
            </Link> 
            &nbsp;    &nbsp;    &nbsp;    &nbsp;    &nbsp;    &nbsp;
            <Link to="/home" className="btnH">
              OK
            </Link>
          </a>
          <a ref={navRef}>
          
          </a>
        </div>
      </section>
 
	 
      </main>
      
  );
  };

export default Success;

import React, { useEffect, useState,useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./style/about.css";
import img from "../images/event.jpg";
import Proptypes from "prop-types";

  
  
  function About(props) {
    const navRef = useRef();

  return (
    <main className="main2">
      <section className="section2">
        <div className="left2">
          <p>ISET Nabeul EVENTS</p>
          <h4>
            Official Web Site For Events In Our University.<br /> Discover Our Multiple Events.
          </h4>
          <a ref={navRef}>
            <Link to="/events" className="btnH2">
              Events
            </Link> 
            &nbsp;    &nbsp;    &nbsp;    &nbsp;    &nbsp;    &nbsp;
            <Link to="/home" className="btnH2">
              Home Page
            </Link>
          </a>
          <a ref={navRef}>
          
          </a>
        </div>
        <div className="right">
          <img src={img} alt="imagem de erro 404" className="aboutimg"/>
          <div className="shadow"></div>
        </div>
      </section>
      <hr/>
	  <footer>
<div className="row primary">
  <div className="column about">
 

  <img src={logo} alt="logo"/>

   <p> 
      Official Site For Iset's Events. All the events are Here.
  </p>

</div>

<div className="column links">
<h3>Discover</h3>

 <ul ref={navRef}>

  <li>
  <a> <Link to="/">Home</Link></a>
  </li>
  <li>
  <a> <Link to="/events">Events</Link></a>
  </li>
  <li>
  <a href="https://isetn.rnu.tn/">Institute</a>
  </li>
  <li>
   <a href="#support">Support</a>
  </li>
 </ul>

</div>


<div className="column links">
  <h3>Links</h3>
   <ul ref={navRef}>
    <li >
	<a> <Link to="/events">Events</Link></a>
    </li>
    <li>
	<a> <Link to="/">Home</Link></a>
    </li>
    <li>
    <a href="#cookies-policy">Cookies Policy</a>
    </li>
    <li>
	<a href="https://isetn.rnu.tn/">Institute</a>
    </li>
  </ul>
</div>

<div className="column subscribe">
 <h3>Newsletter</h3>
  <div>
   <input type="email" placeholder="Your email id here" />
   <button>Subscribe</button>
  </div>

</div>

</div>

<div className="row copyright">
  <div className="footer-menu">

  </div>

   <p>Copyright &copy; 2022 ISET Nabeul</p>

</div>
</footer>
      </main>
      
  );
  };

export default About;

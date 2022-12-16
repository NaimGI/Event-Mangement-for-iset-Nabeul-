import React, { useEffect, useState,useRef } from "react";
import Proptypes from "prop-types";
import './style/events.css'; 
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

GetEvents.propTypes={
    eventList: Proptypes.array,
};

GetEvents.defaultProps={
    eventList:[],
}

function GetEvents(props){
    const navRef = useRef();
    const {eventList}=props;
return(
  

 <section><center>
 <br/> <br/>
    <h1>Events</h1>
    <br/> 
    {eventList.map(post=>(
        
        <div className="card-container">
            <div className="image-container">
    <div key={post.id} className="card-title">
 
     <img src={post.imageUrl} alt='eventImg'/>

   <h3> {post.title}</h3> 
   </div>
    <div className="card-content">
    <div className="card-body">
        <hr/>
    <span className="desc">{post.description}</span>
        <p>
        <span className="dateTxtS">Day start :</span> {post.DayStart} <br/>
        <span className="dateTxtE"> Day end :</span>  {post.DayEnd} <br/> 
        <span className="txtinfo"> Max participants  :</span>  {post.MaxPer} <br/> 
        <span className="txtinfo">Place :</span> {post.place} </p>
     
    </div>
    
    </div>
    <div className="btn">

    <Link to={`/form/${post._id}`}> 
        <button>
	          Join !   
        </button>
    </Link>
     
    </div>
    </div>

    </div>
  
))}
</center>

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
  <a href="/"> <Link to="/">Home</Link></a>
  </li>
  <li>
  <a href="/events"> <Link to="/events">Events</Link></a>
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
	<a href="/events"> <Link to="/events">Events</Link></a>
    </li>
    <li>
	<a href="/"> <Link to="/">Home</Link></a>
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
</footer></section>
);
}
export default GetEvents;
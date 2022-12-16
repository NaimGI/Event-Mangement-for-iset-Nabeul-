import React, { useEffect, useState,useRef } from "react";
import "./style/home.css";
import { Link } from "react-router-dom";
import img from "../images/img.png";
import logo from "../images/logo.png";
import Proptypes from "prop-types";

Home.propTypes={
  eventLateList: Proptypes.array,
};

Home.defaultProps={
  eventLateList:[],
}


function Home(props) {
  const navRef = useRef();
  const {eventLateList}=props;
  return (
    <main className="main">
      <section className="section">
        <div className="left">
          <p>Welcome</p>
          <h4>
            Discover The Different Events <br /> In Our University.
          </h4>
          <a ref={navRef}>
            <Link to="/events" className="btnH">
              Events
            </Link>
          </a>
        </div>
        <div className="right">
          <img src={img} alt="imagem de erro 404" />
          <div className="shadow"></div>
        </div>
      </section>
     <center>
      <div className="container1">
      <br />       <br />    <br />     
        <h1>Latest Events :</h1> <br/><br />
      {eventLateList.map(post=>(
        
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
     
        <br />       <br />       <br />       <br />  <br />  <br />
    </div>
      </center>
      
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
}

export default Home;

import React, { useEffect, useState } from 'react';
import './App.css';
import GetEvents from './components/GetEvents';
import Navbar from './components/Navbar';
import Form from './components/Form';
import Home from './components/Home';
import About from './components/About';
import Success from './components/Success';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [eventList, setEventList] = useState([]);
  const [eventLateList, setEventLateList] = useState([]);
  useEffect(()=>{
async function fetchEventList(){
  try{
    const requestUrl='http://localhost:4000/api/Event/Events';
    const reponse = await fetch(requestUrl);
    const reponseJSON=await reponse.json();
    console.log(reponseJSON);
    setEventList(reponseJSON)
  }catch{

  }
  
}
async function fetchEventLateList(){
  try{
    const requestUrl2='http://localhost:4000/api/Event/LatsEvent';
    const reponse = await fetch(requestUrl2);
    const reponseJSON=await reponse.json();
    console.log(reponseJSON);
    setEventLateList(reponseJSON)
  }catch{

  }
  
}
fetchEventList();
fetchEventLateList();
  },[])
  return (
    <div className="App">
 

      <Router>
        <Navbar></Navbar>
     
        <Routes>
        <Route path="/" element={<Home eventLateList={eventLateList}/>} />
            <Route path="/home" element={<Home eventLateList={eventLateList}/>} />
            <Route path="/events" element={ <GetEvents eventList={eventList}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/form/:id" element={<Form />} />
            <Route path="/success" element={<Success />} />
        </Routes>
    </Router>
   
      
    </div>
  );
}

export default App;

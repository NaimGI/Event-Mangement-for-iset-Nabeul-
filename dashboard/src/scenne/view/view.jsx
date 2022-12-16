import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Box, useTheme, Button } from "@mui/material";
import Header from "../../components/headers.jsx";
import { tokens } from "../../them.js";
import useFetch from "../../hooks/useFetch.js";
import { useState, useEffect } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios"
import List from "../../components/List.jsx"


const Loading = () => {
  return (
    <div className="loading">
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
    </div>
  );
}

const View = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {id}=useParams();

 
  const [info, setInfo] = useState();
  const {error,data,loading}=useFetch(`http://localhost:4000/api/Event/OneEvent/${id}`);
  console.log(data)
  useEffect(() => {
    setInfo(data.U);
  }, [data]);
  
  
 
    return (
        <>
      {loading ? (
        <Loading />
      ) : <>
      { data &&
         
        <Box display="flex" flexDirection="column" justifyContent="center" width="100%">
           <Box>
            
    <CardContent sx={{backgroundColor:colors.blueAccent[400],m:"8px",width:"94%",display:"flex",height: "20%"}}>
    <Box  >
            <img 
            className="imgView"
              src= "https://th.bing.com/th/id/R.c256ddb177ee09dbd9979ecf39ab7840?rik=Qsb17lSKBlR1Gg&pid=ImgRaw&r=0"
              alt=""
            /></Box>
        <Box display="flex" flexDirection="column" justifyContent="center" sx={{gap:"10px",width:"70%",ml:"20px"}} >
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
           {data.title}
         </Typography>
          <Typography variant="body2">
        {data.description}
        </Typography>
      <Typography sx={{ mb: 1.5 ,backgroundColor:colors.blueAccent[300],p:"10px"}} color="text.secondary">
      {`Max Number : ${data.MaxPer}`}
      </Typography>
      <Typography sx={{ mb: 1.5 ,backgroundColor:colors.blueAccent[300],p:"10px"}} color="text.secondary">
      {`Day start : ${data.DayStart}`}
      </Typography>
      <Typography sx={{ mb: 1.5 ,backgroundColor:colors.blueAccent[300],p:"10px"}} color="text.secondary">
      {`Day end : ${data.DayEnd}`}
      </Typography>
      <Typography sx={{ mb: 1.5 ,backgroundColor:colors.blueAccent[300],p:"10px"}} color="text.secondary">
      {`Place : ${data.place}`}
      </Typography>
      </Box>
    </CardContent>
    
    </Box> 
       <List EventId={id}/>
    
        </Box>
      }</>
    }
    </>
         
    
    ) 
}

export default View;

import React from 'react';
import { Typography, Box, useTheme, Button } from "@mui/material";
import { tokens } from "../them.js";
import useFetch from "../hooks/useFetch.js";
import { useState, useEffect } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios"


const List = ({EventId}) => {
  console.log(EventId);
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [info, setInfo] = useState();
  const {error,data,loading}=useFetch(`http://localhost:4000/api/Event/EventUser/${EventId}`);
  console.log(data)
  useEffect(() => {
    setInfo(data);
  }, [data]);
  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'FirstName', headerName: 'First name', width: 130 },
    { field: 'LastName', headerName: 'Last name', width: 130 },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 160,
    },
    {
      field: 'Class',
      headerName: 'Class',
      width: 160,
    },
  ];
  const handelDeletUser=async(id)=>{
    if (
      window.confirm(
        `Are you sure you want to delete the event`
      )
    );
    try {
  const res=await axios.delete(`http://localhost:4000/api/users/RemoveUser/${id}/${EventId}`)
  setInfo(info.filter((item)=>item._id!==id));
      } catch (error) {
  console.log(error)
      }
  }
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button padding="10px" cursor="pointer" color="error">
              <DeleteOutlineIcon
                className="deleteButton"
                onClick={() => handelDeletUser(params.row._id)}
              />
            </Button>
            <Link to={`Edit/${params.row._id}`} style={{ textDecoration: "none" }}>
            <Button padding="10px" cursor="pointer" >
              <ModeEditIcon sx={{color:"#70d8bd"}}
              />
            </Button>
            </Link>
          </Box>
        );
      },
    },
  ];
 
 
    return (
        <>
        {loading ? (
         <CircularProgress sx={{color:colors.greenAccent[200]}}/>
        ) : <>
        { info &&
        <Box  m="10px 10px 10px 10px"
                sx={{
                  height: "350px",
                  "& .MuiDataGrid-root": {
                    border: "none",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: colors.greenAccent[300],
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                  },
                  "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                  },
                  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                  },
                }}>
     
      <DataGrid
        rows={info}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </Box>}</>
}</>
    );
}

export default List;

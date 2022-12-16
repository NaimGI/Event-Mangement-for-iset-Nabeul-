import { Typography, Box, useTheme, Button, } from "@mui/material";
import Header from "../../components/headers.jsx";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData.js";
import { tokens } from "../../them.js";
import useFetch from "../../hooks/useFetch.js";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./team.css";
import DrawerTow from "../../components/Drawer.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";




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
};
const Team = ({ type }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openD, setOpenD] = useState(false);
  const [userId, setId] = useState("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = (id) => {
    setOpenD(true);
    setId(id);
  };

  const handleClose = () => {
    setOpenD(false);
  };

  const [info, setInfo] = useState();
  const { loading, error, data } = useFetch(
    type === "Event"
      ? "http://localhost:4000/api/Event/Events"
      : "http://localhost:4000/api/users/getUsers"
  );
  useEffect(() => {
    setInfo(data);
  }, [data]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        type === "Event"
          ? `http://localhost:4000/api/admin/DeleteEvent/${id}`
          : `http://localhost:4000/api/users/RemoveUser/${id}`
      );
      setInfo(info.filter((item) => item._id !== id));
      setOpenD(false);
    } catch (error) {}
  };
  const columnsEvent = [
    { field: "_id", headerName: "ID",flex: 0.1,
  
  },
    {
      field: "title",
      headerName: "title",
      flex:0.8,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
          <img className="imgTable" src={params.row.imageUrl || "https://th.bing.com/th/id/R.c256ddb177ee09dbd9979ecf39ab7840?rik=Qsb17lSKBlR1Gg&pid=ImgRaw&r=0"} alt="avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "MaxPer",
      headerName: "MaxPer",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "description",
      flex: 1,
    },
    {
      field: "place",
      headerName: "place",
      flex: 1,
    },
    {
      field: "DayStart",
      headerName: "Day Start",
      flex: 1,
    },
    {
      field: "DayEnd",
      headerName: "Day End",
      flex: 1,
    },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
           {type === "Event"?
           <Link to={`view/${params.row._id}`} style={{ textDecoration: "none" }}>
              <Button padding="10px" cursor="pointer">
                <RemoveRedEyeIcon  sx={{color:"#a4a9fc"}}/>
              </Button>
            </Link>:""} 
            {type === "Event"?
            <Button padding="10px" cursor="pointer" color="error">
              <DeleteOutlineIcon
                className="deleteButton"
                onClick={() => handleClickOpen(params.row._id)}
              />
            </Button>:""}
           {type === "Team" ? 
           <Link to={`user/T/${params.row._id}`} style={{ textDecoration: "none" }}>
            <Button padding="10px" cursor="pointer" >
              <ModeEditIcon sx={{color:"#70d8bd"}}
              />
            </Button>
            </Link>:
            <Box cursor="pointer" >
              <DrawerTow id={params.row._id}/>
            </Box>
         
            }
          </Box>
        );
      },
    },
  ];

  const columnsAdmin = [
    { field: "_id", headerName: "ID" },
    {
      field: "FirstName",
      headerName: "FirstName",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "LastName",
      headerName: "LastName",
      flex: 1,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
    {
      field: "Class",
      headerName: "Class",
      flex: 1,
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {info && (
            <Box sx={{ m: "10px", height: "80vh" }}>
              <div className="btnV">
                <Link to="/AddEvent" style={{ textDecoration: "none" }}>
                  <button className="b">Add Event</button>
                </Link>
              </div>
              <Header title="Dashboard" subTitel="Event List" />
              <Box
                m="40px 0 0 0"
                sx={{
                  height: "74vh",
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
                }}
              >
                <DataGrid
                  rows={info}
                  columns={
                    type === "Event"
                      ? columnsEvent.concat(actionColumn)
                      : columnsAdmin.concat(actionColumn)
                  }
                  components={{ Toolbar: GridToolbar }}
                  pageSize={5}
                  rowsPerPageOptions={[1]}
                  checkboxSelection
                  getRowId={(row) => row._id}
                />
              </Box>
               <Dialog
                ClassName="Dialog"
                fullScreen={fullScreen}
                open={openD}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title"  sx={{backgroundColor:"white"}}>
                  {"Are you sure to delete this Event"}
                </DialogTitle>
                <DialogContent  sx={{backgroundColor:"white"}}>
                  <DialogContentText  sx={{color:"black"}}>
                    Do you want to delete this Event
                  </DialogContentText>
                </DialogContent>
                <DialogActions  sx={{backgroundColor:"white"}}>
                  <Button autoFocus onClick={handleClose}>
                    Disagree
                  </Button>
                  <Button onClick={() => handleDelete(userId)} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>  
              <Box> 
              {/*  <DrawerTow open={open} setOpen={setOpen} /> */}
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Team;

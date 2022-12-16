import { useState, React } from "react";
import { Box, Button, colors, TextField,useTheme } from "@mui/material";
import { Formik } from "formik";
import "./image.css"
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
//import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Header from "../../components/headers.jsx";
import axios from "axios";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { tokens } from "../../them.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { checkoutSchema } from "./yupShema.jsx";
import Stack from "@mui/material/Stack";
import { display } from "@mui/system";

const Form = () => {
  const [error, setError] = useState(false);
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [file, setFile] = useState("");
  const handleFormSubmit = async (values) => {
    try {
      const formData=new FormData();
      formData.append("file",file);
      formData.append("upload_preset","thearapy");
    const res=await axios.post("https://api.cloudinary.com/v1_1/nothink/image/upload",formData);
  
    const {url}=res.data;
    const EventData={
      ...values,
      imageUrl:url
    }
    console.log(EventData);
      const resp = await axios.post(
        "http://localhost:4000/api/admin/addEvent",
        EventData
      );
      if (resp.status !== 200) {
        throw error;
      }
       navigate("/Event"); 
    } catch (error) {
      setError(true);
    }
  };
  const handleClose = () => {
    setError(false);
  };

  const initialValues = {
    title: "",
    description: "",
    MaxPer: 0,
    place:"",
    DayStart: "",
    DayEnd: "",
  };

  return (
    <Box m="20px" height="100%">
      <Header title="CREATE Event" subtitle="Create a New Event " />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{display:"flex"}}
            >
              <Box  sx={{display:"flex" ,flexDirection:"column",width:"70%", gap:"20px"}}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="Number"
                label="MaxPer"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.MaxPer}
                name="MaxPer"
                error={!!touched.MaxPer && !!errors.MaxPer}
                helperText={touched.MaxPer && errors.MaxPer}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="place"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.place}
                name="place"
                error={!!touched.place && !!errors.place}
                helperText={touched.place && errors.place}
                sx={{ gridColumn: "span 4" }}
              />
              <Stack spacing={2} sx={{display:"flex" ,flexDirection:"column"}}>
                <TextField
                  id="date"
                  label="Date Of start"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.DayStart}
                  name="DayStart"
                  error={!!touched.DayStart && !!errors.DayStart}
                  helperText={touched.DayStart && errors.DayStart}
                />
                <TextField
                  id="date"
                  label="Date Of End"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.DayEnd}
                  name="DayEnd"
                  error={!!touched.DayEnd && !!errors.DayEnd}
                  helperText={touched.DayEnd && errors.DayEnd}
                />
              </Stack>
               <label htmlFor="file">
                  <DriveFolderUploadIcon className="icon" sx={{fontSize:"100px"}} />
                </label>
                <TextField
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />

            </Box>
            <Box sx={{width:"30%",borderRadius:"10px",height:"100%",ml:"20px",display:"flex",flexDirection:"column"}}>
              <Box>Upload</Box>
            <img 
            className="imgDash"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <Button type="submit" sx={{backgroundColor:"teal",mt:"70px"}}>Create Event</Button>
            </Box>
            
            </Box>
            
            
            
          </form>
        )}
      </Formik>
      <Dialog
        open={error}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"No Service !"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Sorry There is Technical probleme pleaze back up late !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Form;

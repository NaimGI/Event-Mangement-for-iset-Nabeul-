import {useState} from 'react';
import { Box, Button, TextField } from "@mui/material";
import StatBox from '../../components/StatBox';
import { Formik } from "formik";
import dayjs from 'dayjs';


import { useNavigate ,useParams} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useFetch from "../../hooks/useFetch.js";
import Slide from "@mui/material/Slide";
//import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Header from "../../components/headers.jsx";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

import Stack from "@mui/material/Stack";
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
const Edit = () => {
    const [error, setError] = useState(false);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {id}=useParams();


  // Function to get data of one Event
  const {errors,loading,data}=useFetch(`http://localhost:4000/api/Event/OneEvent/${id}`);
  
// Function to Edit and Submit our data
  const handleFormSubmit = async (values) => {
    try {
        console.log(values);
        const initialValues = {
          title:values.title,
          description: values.description,
          MaxPer: values.MaxPer,
          DayStart: values.DayStart,
          DayEnd: values.DayEnd,
        };
      const res = await axios.put(
        `http://localhost:4000/api/admin/updateEvent/${id}`,
        initialValues
      );
      if (res.status !== 200) {
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

  
    return (
        
             <Box m="20px" height="100%">
                {loading ? <Loading />:<>
                {data && <>
      <Header title="Edit Event" subtitle="Edit  an Event " />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={data}
        //validationSchema={checkoutSchema}
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
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
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
              <Stack spacing={2}>
                <TextField
                  id="date"
                  label="Date Of start"
                  type="date"
                  sx={{ width: 220 }}
                  InputLabelProps={{ shrink: true, required: true }}
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
                  placeholder={values.DayEnd}
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Event
              </Button>
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
      </>}
    </>}
    </Box>
    );
}

export default Edit;

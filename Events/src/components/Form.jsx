import {useState,React,useEffect} from 'react';
import { Col, DatePicker, Drawer, Form, Input, Row, Select, Space,Button } from 'antd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {Box} from "@mui/material";
import { useNavigate ,useParams} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./style/forms.css";

import axios from "axios";

import useMediaQuery from "@mui/material/useMediaQuery";


const FormUser = () => {
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const{id}=useParams();
    console.log(id);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // Function to edit the event prop
    const onFinish = async (event) => {
      console.log(event);
      try {
       console.log(id);
        const resId = await axios.post(
          `http://localhost:4000/api/users/addUser`,
          event
        );
        const res = await axios.put(
          `http://localhost:4000/api/users/New/${id}/${resId.data}`
          
        );
        if (res.status !== 200) {
          console.log("Nop");
        }
        navigate("/success");
      } catch (error) {
    
      } 
    };
  
      const handleClose = () => {
        setError(false);
      };
    
      const initialValues = {
        FirstName: "",
        LastName: "",
        email: "",
        Class: "",
      };

  return (
    <Box m="20px" height="100%" >
      <Box sx={{margin:"auto",width:"55%"}}>
    <Form layout="vertical" hideRequiredMark onFinish={onFinish} className="forms" >
    <h2>Participation Form :</h2>
          <Row gutter={20}>
            <Col span={24}>
           
              <Form.Item
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your FirstName',
                  },
                ]}
              >
                <Input type='text'   name="FirstName" placeholder='Please enter your FirstName' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
           
              <Form.Item
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your LastName',
                  },
                ]}
              >
                <Input type='text'   name="LastName" placeholder='Please enter your LastName' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
           
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}
              >
                <Input type='text'   name="email" placeholder='Please enter your email' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
           
              <Form.Item 
                name="Class"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Class',
                  },
                ]}
              >
                <Input type='text'   name="Class" placeholder='Please enter your Class' />
            </Form.Item>
            </Col>
          </Row>
          <Box display="flex" justifyContent="center" >
          <Box  width="200px" padding="20px" >
            <Button block type="primary" htmlType="submit" >
               Join now !!
            </Button>
            </Box>
          </Box>
        </Form>
    <Dialog
      open={error}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"No Service !"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Sorry There is Technical probleme please comeback later !
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
    </Box>
  </Box>
  );
};

export default FormUser;

import {useState,React,useEffect} from 'react';
import { Button, Drawer, Radio, Space ,Col, Form, Input, Row, Select,} from 'antd';
import {Box,TextField} from "@mui/material";
import { useNavigate ,useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
const TopDrawer= (props) => {
  const [open, setOpen] = useState(false);
  const {selected}=props;
  const [file,setFile]=useState("");
  console.log(selected);

  const showDrawer = () => {
    setOpen(true);
  };
const  navigate=useNavigate()
  const onClose = () => {
    setOpen(false);
  };
   // Function to edit the event prop
   const onFinish = async (event) => {
    console.log(event);
    try {
      const formData=new FormData();
      formData.append("file",file);
      formData.append("upload_preset","thearapy");
    const res=await axios.post("https://api.cloudinary.com/v1_1/nothink/image/upload",formData);
  
    const {url}=res.data;
    const EventData={
      ...event,
      imageUrl:url
    }
    console.log(EventData);
      const resp = await axios.post(
        "http://localhost:4000/api/admin/addEvent",
        EventData
      );
      if (resp.status !== 200) {
      }
       navigate("/Event"); 
    } catch (error) {
    }
  };
  return (
    <>
      <Space>
        <Button type="primary" sx={{width:"200px",p:"20px"}} onClick={showDrawer}>
          Add Event
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        placement="right"
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
        <Row gutter={16}>
            <Col span={12}>
           
            <label htmlFor="file">
                  <DriveFolderUploadIcon className="icon" sx={{fontSize:"50px",mt:"40px"}} />
                </label>
                <TextField
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
            </Col>
            <Col>
            <Box sx={{width:"70%",borderRadius:"10px",height:"100px",ml:"20px",display:"flex",flexDirection:"column"}}>
            <img 
            className="imgDash"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            </Box>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
           
              <Form.Item
                name="title"
                label="title"
              
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input type='text'  name="title" placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="MaxPer"
                label="MaxNumber"
              
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" name='MaxPer'  type='number' />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={16}>
            <Col span={12}>
           
              <Form.Item
                name="place"
                label="place"
              
                rules={[
                  {
                    required: true,
                    message: 'Please enter place',
                  },
                ]}
              >
                <Input type='text'   name="place" placeholder="Please enter place" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
          <Col span={12}>
          <Form.Item
                name="DayStart"
                label="DayStart"
                initialValue={selected.startStr}
              >
          <Input
             type="date"
           />
           </Form.Item>
           </Col>
           <Col span={12}>
           <Form.Item
                name="DayEnd"
                label="Day End"
                initialValue={selected.endStr}
              >
          <Input
             type="date" name="begin"
             placeholder={selected.endStr} value=""
             min="1997-01-01" max="2030-12-31"
           />
           </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
            
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" name='description' />
              </Form.Item>
              <Form.Item>
              <Space>
              <Button onClick={onClose}>Cancel</Button>
             <Button block type="primary" htmlType="submit">
               Add
            </Button>
            </Space>
            </Form.Item>
        
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
export default TopDrawer;
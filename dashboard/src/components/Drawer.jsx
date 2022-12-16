import {useState,React,useEffect} from 'react';
import { Col, DatePicker, Drawer, Form, Input, Row, Select, Space,Button } from 'antd';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useNavigate ,useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import dayjs from 'dayjs';
import axios from "axios";
import customParseFormat from 'dayjs/plugin/customParseFormat';
const { RangePicker } = DatePicker;
const { Option } = Select;

const DrawerTow = (props) => {
  const navigate = useNavigate();
  const dateFormat = 'DD/MM/YYYY';
   const {id}=props
   const [idUp,setIdup]=useState("");
   useEffect(() => {
    setIdup(id);
   }, []);
   console.log(id)
    const [open, setOpen] = useState(false); 
  
    const onClose = () => {
      setOpen(false);
    };
    const showDrawer = () => {
      setOpen(true);
    };
   
    
    // Function to edit the event prop
    const onFinish = async (event) => {
      console.log(event);
      try {
       
        const res = await axios.put(
          `http://localhost:4000/api/admin/updateEvent/${idUp}`,
          event
        );
        if (res.status !== 200) {
          console.log("Nop")
        }
        setOpen(false);
        navigate("/Event");
      } catch (error) {
    
      }
    };
     // Function to get data of one Event
  const {errors,loading,data}=useFetch(`http://localhost:4000/api/Event/OneEvent/${idUp}`);
 
  
    return (
        <div>
            {data &&<>
            <Button margin="10px" onClick={showDrawer}>
            <ModeEditIcon sx={{color:"#70d8bd"}}/>
           </Button>
            <Drawer
        title="Update a Event"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Form layout="vertical" hideRequiredMark onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
           
              <Form.Item
                name="title"
                label="title"
                initialValue={data.title}
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input type='text'   name="title" placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="MaxPer"
                label="MaxNumber"
                initialValue={data.MaxPer}
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
                initialValue={data.place}
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
                initialValue={data.DayStart}
              >
          <Input
             type="date"
           />
           </Form.Item>
           <Form.Item
                name="DayEnd"
                label="Day End"
                initialValue={data.DayEnd}
              >
          <Input
             type="date" name="begin"
             placeholder={data.DayEnd} value=""
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
                initialValue={data.description}
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
               Update
            </Button>
            </Space>
            </Form.Item>
        
            </Col>
          </Row>
        </Form>
      </Drawer></>}
        </div>
    );
}

export default DrawerTow;

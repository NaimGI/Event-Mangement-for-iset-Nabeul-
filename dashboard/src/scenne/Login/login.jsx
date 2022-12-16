import { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import "./login.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  console.log(credentials);
  const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleEvent = async () => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        credentials,
        { withCredentials: true }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.detail });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", width: "100%" }}
      className="bck"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ m: "10px", width: "300px", height: "200px", gap: "20px" }}
      >
        <TextField sx={{backgroundColor:"white",m:"8px"}}
          id="outlined-basic"
          label="Username"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          id="username"
          variant="outlined"
          onChange={handleChange}
        />
        <TextField sx={{backgroundColor:"white"}}
        type="password"
          id="outlined-basic"
          label="password"
          variant="outlined"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          id="password"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          sx={{ m: "10px", width: "70%" }}
          onClick={handleEvent}
        >
          Login
        </Button>
        {error && <Alert severity="error">{error.message}</Alert>}
      </Box>
      <Box sx={{ m: "10px", width: "400px", height: "300px" }}>
        <img
          className="imgLogin"
          src="https://bizgurukul.com/Biz/img/login-form-banner-mob.png"
          alt="naim"
        />
      </Box>
    </Box>
  );
};

export default Login;

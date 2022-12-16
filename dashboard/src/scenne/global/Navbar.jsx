import { useContext } from "react";
import { ColorModeContext, tokens } from "../../them.js";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { AuthContext } from "../../context/AuthContext.js";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { dispatch } = useContext(AuthContext);
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.setItem("user", null);
      dispatch({ type: "LOGOUT" });
      await axios.get("http://localhost:4000/api/auth/logout", { withCredentials: true });
      navigate("/login");
    } catch (error) {
      
    }
  
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"></InputBase>
        <IconButton sx={{ p: 1 }} type="button">
          <SearchOutlinedIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        <IconButton>
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;

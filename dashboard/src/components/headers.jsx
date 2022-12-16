import React from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../them.js";

const Headers = ({ title, subTitel }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontWeight="bold"
        color={colors.grey[100]}
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        fontWeight="bold"
        color={colors.greenAccent[400]}
      >
        {subTitel}
      </Typography>
    </Box>
  );
};

export default Headers;

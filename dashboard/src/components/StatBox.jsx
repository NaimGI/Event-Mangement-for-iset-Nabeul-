import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import ProgressCircle from "../components/Progress";
import { tokens } from "../them.js";
import useFetch from "../hooks/useFetch.js";
import CircularProgress from "@mui/material/CircularProgress";
const StatBox = ({ title, subtitle, icon, progress, increase, name,from }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { loading, error, data } = useFetch(
    `http://localhost:4000/api/${from}/${name}/`
  );

  return (
    <>
      {data && (
        <>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Box width="100%" m="0 30px">
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    {icon}
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{ color: colors.grey[100] }}
                    >
                      {data}
                    </Typography>
                  </Box>
                  <Box>
                    <ProgressCircle progress={progress} />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" mt="2px">
                  <Typography
                    variant="h5"
                    sx={{ color: colors.greenAccent[500] }}
                  >
                    {subtitle}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontStyle="italic"
                    sx={{ color: colors.greenAccent[600] }}
                  >
                    {increase}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StatBox;

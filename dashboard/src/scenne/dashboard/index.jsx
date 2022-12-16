import { useEffect, useState } from "react";
import Header from "../../components/headers.jsx";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ProgressCircle from "../../components/Progress";
import { tokens } from "../../them.js";
import StatBox from "../../components/StatBox";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import { mockTransactions } from "../../data/mockData";
import LineChart from "../../components/LineChart";
import useFetch from "../../hooks/useFetch.js";
import axios from "axios";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [info, setInfo] = useState();
  const { data, loading, error } = useFetch(
    "http://localhost:4000/api/Event/latsEvent/"
  );
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    setInfo(data);
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  }, [data]);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItem="center">
        <Header title="Dashboard" subTitel="Welcom to your Dashboard" />
        <Box>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Event Numbers"
            progress="0.75"
            increase="+14%"
            name="EventsNumber"
            from="Event"
            icon={
              <EventIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Users Numbers"
            progress="0.75"
            increase="+14%"
            name="UsersNumber"
            from="users"
            icon={
              <GroupIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Users Access
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        {/*Recent Event */}
        {info && (
          <>
            {loading ? (
              ""
            ) : (
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  colors={colors.grey[100]}
                  p="15px"
                >
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontWeight="600"
                  >
                    Recent Events
                  </Typography>
                </Box>
                {info.map((transaction, i) => (
                  <Box
                    key={`${transaction._id}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {transaction.title}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {transaction.MaxPer}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{transaction.DayStart}</Box>
                    <Box
                      backgroundColor={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      {transaction.MaxPer}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

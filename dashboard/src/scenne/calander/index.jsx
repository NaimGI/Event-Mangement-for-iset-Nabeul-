import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useFetch from "../../hooks/useFetch.js";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../them.js";
import TopDrawer from "../../components/topDrawer.jsx";
import axios from "axios";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/headers";

const Calonder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [err, setError] = useState(false);
  const [id, setId] = useState("");
  const [selectedTime,setSelectedTime]=useState();
  const handleDateClick = (selected) => {
    
    setSelectedTime(selected);
    /* const title = prompt("Please enter a new title for your event");
    const MaxPer = prompt("Please enter The Max persone Of Event");
    const Desc = prompt("Please enter The description");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title && MaxPer && Desc) {
      const values = {
        title: title,
        description: Desc,
        MaxPer: parseInt(MaxPer),
        DayStart: selected.startStr,
        DayEnd: selected.endStr,
      };
      try {
        const res = await axios.post(
          "http://localhost:4000/api/admin/addEvent",
          values
        );
        if (res.status !== 200) {
          throw err;
        }
        setId(res.data._id);
        calendarApi.addEvent({
          id: res.data._id,
          title,
          MaxPer,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
        });
      } catch (error) {
        setError(true);
      }
    } */
  };
  const handleEventClick = async (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      try {
        selected.event.remove();
        await axios.delete(`http://localhost:4000/api/admin/DeleteEvent/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
         <Box sx={{m:"10px"}}>{selectedTime !=undefined ?<TopDrawer selected={selectedTime}/> :""}</Box> 
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }} 
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate(event.Start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                       
                      </Typography>
                      <Typography>
                        {formatDate(event.end, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calonder;

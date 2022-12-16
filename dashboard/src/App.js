import { ColorModeContext, useMode } from "./them";
import "./App.css";
import { useState, useContext } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./scenne/global/Navbar.jsx";
import Dashboard from "./scenne/dashboard/index.jsx";
import Sidebar from "./scenne/global/sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Form from "./scenne/Form/Form.jsx";
import Team from "./scenne/team/team.jsx";
import Calendar from "./scenne/calander/index.jsx";
import Edit from "./scenne/Edit/Edit.jsx"
import EditUser from "./scenne/EditUser/EditUser.jsx"
import { AuthContext } from "./context/AuthContext.js";
import Login from "./scenne/Login/login.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import View from "./scenne/view/view.jsx"
import Faq from "./scenne/Faq/index.jsx";
import { useLocation, Navigate } from "react-router-dom";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const lt = location.pathname;
  const ProductedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {lt === "/login" ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="app">
                <Sidebar />
                <main className="content">
                  <Navbar />
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProductedRoute>
                          <Dashboard />
                        </ProductedRoute>
                      }
                    />
                    <Route
                      path="/Team"
                      >
                        <Route index element={
                        <ProductedRoute>
                          <Team type="Team" />
                        </ProductedRoute>
                      }> 
                      </Route>
                        <Route path="user/T/:id" element={ <EditUser />}></Route>
                    </Route>
                    <Route
                      path="/Event">
                         <Route index element={
                        <ProductedRoute>
                          <Team type="Event" />
                        </ProductedRoute>
                      }> 
                      </Route>
                        <Route path="user/:id" element={<Edit />}></Route>
                        <Route path="view/:id" >
                          <Route index element={<View />} ></Route>
                          <Route path="Edit/:id" element={<EditUser />}></Route>
                        </Route>
                        
                    </Route>
                    <Route
                      path="/AddEvent"
                      element={
                        <ProductedRoute>
                          <Form />
                        </ProductedRoute>
                      }
                    />
                    <Route
                      path="/calendar"
                      element={
                        <ProductedRoute>
                          <Calendar />
                        </ProductedRoute>
                      }
                    />
                    <Route
                      path="/faq"
                      element={
                        <ProductedRoute>
                          <Faq />
                        </ProductedRoute>
                      }
                    />
                  </Routes>
                </main>
              </div>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </>
      )}
    </LocalizationProvider>
  );
}

export default App;

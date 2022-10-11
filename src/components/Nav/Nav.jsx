import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Icon,
  Drawer,
  useTheme,
  useMediaQuery,
  List,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
} from "@material-ui/core";

//This component contains code for the navbar displayed to all users. Displays the organization's name as well as a clickable hamburger/menu icon for opening the Drawer component which renders link according to user's clearance level (admin or employee).

function Nav() {
  
  //Const variables

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const user = useSelector((store) => store.user);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Independent Living Care Services</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <IconButton
              onClick={() => {
                setOpenDrawer(!openDrawer);
              }}
            >
              <MenuIcon />
            </IconButton>
          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="navBarWidth">
          <h1>Menu</h1>
          {user.clearance_level > 0 ? (
            <List>
              <ListItem>
                <Button
                  component={Link}
                  to="/adminAllTimesheets"
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <h3>All Submissions</h3>
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  component={Link}
                  to="/all-clients"
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <h3>Clients</h3>
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  component={Link}
                  to="/employeesview"
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <h3>Employees</h3>
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  component={Link}
                  to="/"
                  onClick={() => {
                    setOpenDrawer(!openDrawer);
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  <h3>Logout</h3>
                </Button>
              </ListItem>
            </List>
          ) : (
            <List>
              <ListItem>
                <Button
                  component={Link}
                  to="/"
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <h3>Home</h3>
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  component={Link}
                  to="/user/timesheets"
                  onClick={() => setOpenDrawer(!openDrawer)}
                >
                  <h3>Timesheets</h3>
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  component={Link}
                  to="/"
                  onClick={() => {
                    setOpenDrawer(!openDrawer);
                    dispatch({ type: "LOGOUT" });
                  }}
                >
                  <h3>Logout</h3>
                </Button>
              </ListItem>
            </List>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Nav;

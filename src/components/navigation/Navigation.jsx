import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { signOutUser } from "../../actions/signInOutAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastLoginTime");
  };

  const handleLogout = () => {
    navigate("/");
    deleteToken();
    dispatch(signOutUser(true));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            variant="contained"
            color="warning"
            size="large"
            align="left"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navigation;

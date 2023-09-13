import React from "react";
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../../assets";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import "./Useroption.css";
import { logOutProfile } from "../../../Redux/Auth/AuthAction";
import HomeIcon from "@mui/icons-material/Home";

function MySpeedDial() {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (action) => {
    if (action === "Dashboard") {
      navigate("/dashboard");
    }
    if (action === "Home") {
      navigate("/");
    }
    if (action === "Orders") {
      navigate("/cart");
    }
    if (action === "Profile") {
      navigate("/profile");
    }
    if (action === "Logout") {
      dispatch(logOutProfile());
    }
  };

  const options = [
    { icon: <HomeIcon />, name: "Home", func: handleActionClick },
    { icon: <ListAltIcon />, name: "Orders", func: handleActionClick },
    { icon: <PersonIcon />, name: "Profile", func: handleActionClick },
    { icon: <ExitToAppIcon />, name: "Logout", func: handleActionClick },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: handleActionClick,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={
          <img
            className="profileimg"
            src={user?.avatar ? user.avatar?.url : profile}
            alt="Nf"
          />
        }
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
        className="speedDial"
      >
        {options &&
          options.map((opt, index) => {
            return (
              <SpeedDialAction
                key={index}
                icon={opt.icon}
                tooltipTitle={opt.name}
                s
                onClick={() => opt.func(`${opt.name}`.toString())}
              />
            );
          })}
      </SpeedDial>
    </>
  );
}

export default MySpeedDial;

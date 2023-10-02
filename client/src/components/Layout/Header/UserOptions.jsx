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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function MySpeedDial() {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cart);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (action) => {
    if (action === "Dashboard") {
      navigate("/admin/dashboard");
    }
    if (action === "Home") {
      navigate("/");
    }
    if (action === "Orders") {
      navigate("/orders");
    }
    if (action.includes("Carts")) {
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
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartList.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Carts(${cartList.length})`,
      func: handleActionClick,
    },
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
        transitionDuration={1000}
      >
        {options &&
          options.map((opt, index) => {
            return (
              <SpeedDialAction
                key={index}
                icon={opt.icon}
                tooltipTitle={opt.name}
                onClick={() => opt.func(`${opt.name}`.toString())}
                tooltipOpen={window.innerWidth > 600 ? true : false}
              />
            );
          })}
      </SpeedDial>
    </>
  );
}

export default MySpeedDial;

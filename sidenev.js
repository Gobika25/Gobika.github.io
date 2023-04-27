import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import styles from "./sidenav.module.css";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink, useNavigate } from "react-router-dom";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { React, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LanIcon from "@mui/icons-material/Lan";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
import user from "./assets/user.jpg";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@material-ui/core/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Sidenav() {
  const [open, setopen] = useState(false);
  const role = localStorage.getItem("userId");
  console.log("locall", localStorage.getItem("userId"));
  const Variable = JSON.parse(role);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const navData = [
    {
      id: 0,
      icon: <PersonIcon />,
      text: "Profile",
      link: "profile",
    },
    {
      id: 1,
      icon: <HomeIcon />,
      text: "Home",
      link: "barchart",
    },
    {
      id: 2,
      icon: <LocalMoviesIcon />,
      text: "Theatre List",
      link: "home",
    },
    {
      id: 3,
      icon: <TravelExploreIcon />,
      text: "List Of Movies",
      link: "allmovie",
    },
    {
      id: 4,
      icon: <BarChartIcon />,
      text: "History",
      link: "history",
    },
    {
      id: 5,
      icon: <LogoutIcon />,
      text: "Logout",
      link: "login",
    },
  ];
  const adminData = [
    {
      id: 0,
      icon: <PersonIcon />,
      text: "Profile",
      link: "profile",
    },
    {
      id: 1,
      icon: <AddToPhotosIcon />,
      text: "Add Movie",
      link: "addMovie",
    },
    {
      id: 2,
      icon: <HomeWorkIcon />,
      text: "Add Theatre",
      link: "addTheatre",
    },
    {
      id: 3,
      icon: <LanIcon />,
      text: "Allocate Movie",
      link: "admin",
    },
    {
      id: 4,
      icon: <LogoutIcon />,
      text: "Logout",
      link: "login",
    },
  ];
  const toggleOpen = () => {
    setopen(!open);
    console.log(Variable.role);
  };
  // const logout = (item) => {
  //   console.log(item);
  //   if (item.text === "Logout" && value === true) {
  //     localStorage.removeItem("userId");
  //   }
  //   setValue(!value);
  // };

  const onClick = (e, item) => {
    console.log(item.link);
    if (item.link === "profile") {
      setProfileOpen(true);
    } else {
      navigate("/" + item.link);
    }
  };
  const onClose = () => {
    setProfileOpen(false);
  };

  return (
    <div className={open ? styles.sidenav : styles.sidenavClosed}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
      </button>
      {Variable.role === 1 && (
        <>
          {navData.map((item) => {
            return (
              <div
                key={item.id}
                className={styles.sideitem}
                onClick={(e) => onClick(e, item)}
              >
                {item.icon}
                <span
                  className={open ? styles.linkText : styles.linkTextClosed}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </>
      )}
      {Variable.role === 2 && (
        <>
          {adminData.map((item) => {
            return (
              <div
                key={item.id}
                className={styles.sideitem}
                onClick={(e) => onClick(e, item)}
              >
                {item.icon}
                <span
                  // onClick={item.text === "Logout" ? logout(item) : ""}
                  className={open ? styles.linkText : styles.linkTextClosed}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </>
      )}
      {/* {profileOpen && ( */}
      <Modal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <img src={user} style={{ paddingLeft: "50px" }} />
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{
              paddingTop: "50px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            {Variable.name}
          </Typography>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{ justifyContent: "center", display: "flex" }}
          >
            {Variable.emailID}
          </Typography>
          {Variable.role === 1 && (
            <h6
              style={{
                justifyContent: "center",
                display: "flex",
                paddingTop: "50px",
              }}
            >
              Your Logged in as a User!
            </h6>
          )}
          {Variable.role === 2 && (
            <h6
              style={{
                justifyContent: "center",
                display: "flex",
                paddingTop: "50px",
              }}
            >
              Your Logged in as a Admin!
            </h6>
          )}
        </Box>
      </Modal>
      {/* )} */}
    </div>
  );
}

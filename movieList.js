import React, { useEffect, useState, Component } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Snackbar } from "@mui/material";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
} from "mdb-react-ui-kit";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Movie(props) {
  const Movie = (props) => {
    return <h2> {props.message} </h2>;
  };
  const [movie, setMovie] = useState([]);
  const [searchparams] = useSearchParams();
  const [expanded, setExpanded] = React.useState(false);
  const [index, setIndex] = useState(0);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);
  const [selectedTicket, setSelectedTicket] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (t) => {
    console.log(t);
    setOpen(true);
    setSelectedMovie(t);
    console.log(t.rating);
    setRating(t.rating);
  };

  const handleClose = () => {
    setOpen(false);
    document.getElementById("personscount").value = "";
    setTotalTicketPrice(0);
  };

  useEffect(() => {
    const value = parseInt(searchparams.get("id"));
    console.log(value);
    getMovie(value);
  }, []);

  const getMovie = async (value) => {
    const response = await fetch(
      `https://localhost:44335/api/Ticket/GetTheatreMovieList?theaterid=${value}`
    );
    const data = await response.json();
    console.log(data);
    setMovie(data);
  };

  const confirmBooking = async (datas) => {
    const user = localStorage.getItem("userId");
    const Variable = JSON.parse(user);
    console.log(Variable.userId);
    console.log(Variable);
    setOpenSnackBar(true);
    setOpen(false);
    const response = await fetch(
      `https://localhost:44335/api/Ticket/MovieWatched?movieId=${selectedMovie.movieID}&userId=${Variable.userId}&theatreId=${selectedMovie.theatreId}&price=${selectedMovie.price}&tickets=${selectedTicket}&total=${totalTicketPrice}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handlePriceChange = (e) => {
    setSelectedTicket(e.target.value);
    const totalPriceCount = e.target.value * selectedMovie.price;
    setTotalTicketPrice(totalPriceCount);
  };

  return (
    <div>
      {/* <Carousel>
        　　　{" "}
        <Carousel.Item className="slide">
          {movie.map((t) => (
            <Card sx={{ width: "500px" }} style={{ margin: "80px" }}>
              <CardHeader title={t.name} subheader={t.date} />
              <img
                src={t.imageLink}
                style={{ height: "200px", width: "500px" }}
              ></img>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="book" onClick={() => confirmBooking(t)}>
                  <CheckIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    <li>{t.cast}</li>
                  </Typography>
                  <Typography paragraph>
                    <li>{t.describtion}</li>
                  </Typography>
                  <Typography paragraph>
                    <li>{t.showTime}</li>
                  </Typography>
                  <Typography paragraph>
                    <li>{t.price}</li>
                  </Typography>
                  <Typography paragraph>
                    <li>{t.place}</li>
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Carousel.Item>
      </Carousel> */}
      {/* <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        // style={{ width: "auto", height: "500px" }}
      >
        {movie.map((t) => (
          <Carousel.Item>
            <img
              className="d-block"
              src={t.imageLink}
              alt="First slide"
              style={{ width: "600px", height: "500px" }}
            />
            <Carousel.Caption>
              <h3>{t.name}</h3>
              <p>{t.describtion}</p>
              <button type="button" onClick={() => confirmBooking(t)}>
                Book Me!
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      {openSnackBar && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackBar(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={() => setOpenSnackBar(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Movie Booked Successfully
            </Alert>
          </Snackbar>
        </Stack>
      )} */}
      <MDBRow
        className="row-cols-1 row-cols-md-3 g-3"
        style={{ width: "1000px" }}
      >
        {movie.map((t) => (
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src={t.imageLink}
                alt="..."
                position="top"
                style={{ height: "500px" }}
              />
              <MDBCardBody>
                <MDBCardTitle>Movie Nme: {t.name}</MDBCardTitle>
                <MDBCardText>Description: {t.describtion}</MDBCardText>
                <MDBCardText>Release Date: {t.date}</MDBCardText>
                <MDBCardText>Price: {t.price}</MDBCardText>
                <button type="button" onClick={() => handleClickOpen(t)}>
                  Book Me!
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
      {openSnackBar && (
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={openSnackBar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackBar(false)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Alert
              onClose={() => setOpenSnackBar(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Movie Booked Successfully
            </Alert>
          </Snackbar>
        </Stack>
      )}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ justifyContent: "center", display: "flex" }}>
          <img
            src={selectedMovie.imageLink}
            style={{ height: "250px", width: "250px" }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{ justifyContent: "center", display: "flex" }}
          >
            {selectedMovie.name}
          </Typography>
          <Rating
            name="half-rating-read"
            precision={0.5}
            value={rating}
            readOnly
            style={{ display: "flex", justifyContent: "center" }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            style={{ justifyContent: "center", display: "flex" }}
          >
            Price: {selectedMovie.price}
          </Typography>
          {/* <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            style={{ width: "10px" }}
          /> */}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            style={{
              justifyContent: "center",
              display: "flex",
              paddingRight: "40px",
            }}
          >
            No.of Tickets :
            <input
              type="number"
              id="personscount"
              name="personscount"
              style={{ width: "20%" }}
              onChange={(e) => handlePriceChange(e)}
            ></input>
          </Typography>
          <Typography
            id="totalprice"
            variant="h6"
            component="h6"
            style={{ justifyContent: "center", display: "flex" }}
          >
            Total Price: {totalTicketPrice}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={confirmBooking}>Confirm Booking</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Movie;

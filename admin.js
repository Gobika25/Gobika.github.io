import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Label } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Admin(props) {
  useEffect(() => {
    getTheatre();
    getMovies();
  }, []);
  const [theatreDetail, setTheatre] = useState([]);
  const [movieDetail, setMovie] = useState([]);
  const [theatreId, setTheatreId] = useState(0);
  const [movieId, setMovieId] = useState(0);
  const [show, setShow] = useState(" ");
  const [screen, setScreen] = useState(" ");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  console.log(theatreDetail);
  const getTheatre = async () => {
    const response = await fetch(
      `https://localhost:44335/api/Ticket/GetTheatreList`
    );
    const data = await response.json();
    setTheatre(data);
    console.log(data);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTheatreId(e.target.value);
    // setTheatre(event.target.value);
  };
  const MovieChange = (e) => {
    console.log(e.target.value);
    setMovieId(e.target.value);
    // setTheatre(event.target.value);
  };

  const showChange = (event) => {
    setShow(event.target.value);
  };
  const screenChange = (event) => {
    setScreen(event.target.value);
  };
  const getMovies = async () => {
    const response = await fetch(`https://localhost:44335/api/Ticket/GetMovie`);
    const data = await response.json();
    setMovie(data);
    console.log(data);
  };

  const confirm = async () => {
    setOpenSnackBar(true);
    const response = await fetch(
      `https://localhost:44335/api/Ticket/TheatreList?theatreId=${theatreId}&movieId=${movieId}&show=${show}&screen=${screen}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    console.log(data);
  };
  return (
    <div>
      {" "}
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Allocate Movie to Theatres
              </h3>

              <MDBRow>
                <MDBCol md="6">
                  <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                    <InputLabel id="demo-select-small">Theatre Name</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={theatreId}
                      label="Theatre Name"
                      onChange={(e) => handleChange(e)}
                    >
                      {theatreDetail.map((hi) => (
                        <MenuItem value={hi.theatreId}>
                          {hi.theatreName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MDBCol>

                <MDBCol md="6">
                  <FormControl sx={{ m: 1, minWidth: 200 }} size="smalls">
                    <InputLabel id="demo-select-smalls">Movie Name</InputLabel>
                    <Select
                      labelId="demo-select-smalls"
                      id="demo-select-smalls"
                      value={movieId}
                      label="Movie Name"
                      onChange={(e) => MovieChange(e)}
                    >
                      {movieDetail.map((hi) => (
                        <MenuItem value={hi.id}>{hi.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <FormControl sx={{ m: 1, minWidth: 200 }} size="smallses">
                    <InputLabel id="demo-select-smalls">Show Time</InputLabel>
                    <Select
                      labelId="demo-select-smallses"
                      id="demo-select-smallses"
                      value={show}
                      onChange={showChange}
                      autoWidth
                      label="Show Time"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"11:00 AM"}>11:00 AM</MenuItem>
                      <MenuItem value={"12:00 PM"}>12:00 PM</MenuItem>
                      <MenuItem value={"6:00 PM"}>6:00 PM</MenuItem>
                    </Select>
                  </FormControl>
                </MDBCol>

                <MDBCol md="6">
                  <FormControl sx={{ m: 1, minWidth: 200 }} size="smallsess">
                    <InputLabel id="demo-select-smallss">Screens</InputLabel>
                    <Select
                      labelId="demo-select-smallsess"
                      id="demo-select-smallsess"
                      value={screen}
                      onChange={screenChange}
                      autoWidth
                      label="Screen"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Screen 1"}>Screen 1</MenuItem>
                      <MenuItem value={"Screen 2"}>Screen 2</MenuItem>
                      <MenuItem value={"Screen 3"}>Screen 3</MenuItem>
                    </Select>
                  </FormControl>
                </MDBCol>
              </MDBRow>
              <button onClick={confirm}>Submit</button>
            </MDBCardBody>
          </MDBCard>
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
                Allocated Successfully
              </Alert>
            </Snackbar>
          </Stack>
        )}
      </MDBContainer>
    </div>
  );
}

export default Admin;

import React, { useState } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Snackbar } from "@mui/material";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddMovie() {
  const [name, setName] = useState("");
  const [describtion, setDescribtion] = useState(" ");
  const [cast, setCast] = useState(" ");
  const [date, setDate] = useState(" ");
  const [rating, setRating] = useState(" ");
  const [imageLink, setImageLink] = useState(" ");
  const [price, setPrice] = useState(" ");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const submit = async () => {
    setOpenSnackBar(true);
    let payload = [
      {
        name: name,
        describtion: describtion,
        cast: cast,
        date: date,
        rating: rating,
        imageLink: imageLink,
        price: price,
      },
    ];
    const response = await fetch(
      `https://localhost:44335/api/Ticket/MoviePostList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center align-items-center m-5">
        <MDBCard>
          <MDBCardBody className="px-4">
            <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">Add a Movie</h3>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Movie Name"
                  size="lg"
                  id="form1"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Description"
                  size="lg"
                  id="form2"
                  type="text"
                  onChange={(e) => setDescribtion(e.target.value)}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="cast"
                  size="lg"
                  id="form3"
                  type="text"
                  onChange={(e) => setCast(e.target.value)}
                />
              </MDBCol>

              <MDBCol md="6" className="mb-4">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Date"
                  size="lg"
                  id="form4"
                  type="text"
                  onChange={(e) => setDate(e.target.value)}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Rating"
                  size="lg"
                  id="form4"
                  type="text"
                  onChange={(e) => setRating(e.target.value)}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Image Link"
                  size="lg"
                  id="form5"
                  type="text"
                  onChange={(e) => setImageLink(e.target.value)}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Price"
                  size="lg"
                  id="form5"
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </MDBCol>
            </MDBRow>

            <button onClick={submit}>Submit</button>
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
              {name} Movie Added Successfully
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </MDBContainer>
  );
}

export default AddMovie;

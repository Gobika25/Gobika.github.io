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
import { Snackbar } from "@mui/material";
import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddTheatre() {
  const [theatreId, setTheatreId] = useState(0);
  const [theatreName, setTheatreName] = useState(" ");
  const [place, setPlace] = useState(" ");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const submit = async () => {
    setOpenSnackBar(true);
    let payload = [
      {
        theatreId: theatreId,
        theatreName: theatreName,
        place: place,
      },
    ];
    const response = await fetch(
      `https://localhost:44335/api/Ticket/TheatrePostList`,
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

  //   const handleTheatreIdChange = (event) => {
  //     setTheatreId(event.target.value);
  //   };

  return (
    <div>
      {" "}
      <MDBContainer fluid>
        <MDBRow className="justify-content-center align-items-center m-5">
          <MDBCard>
            <MDBCardBody className="px-4">
              <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                Add a Theatre
              </h3>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Theatre Id"
                    size="lg"
                    id="form1"
                    type="text"
                    onChange={(e) => setTheatreId(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Theatre Name"
                    size="lg"
                    id="form2"
                    type="text"
                    onChange={(e) => setTheatreName(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Place"
                    size="lg"
                    id="form3"
                    type="text"
                    onChange={(e) => setPlace(e.target.value)}
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
                {theatreName} Theatre Added Successfully
              </Alert>
            </Snackbar>
          </Stack>
        )}
      </MDBContainer>
    </div>
  );
}

export default AddTheatre;

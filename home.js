import { React, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, createSearchParams } from "react-router-dom";
import Movie from "./movieList";
import Sidenav from "./sidenev";
import Admin from "./admin";
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

function Home(props) {
  console.log(props);
  let navigate = useNavigate();
  const [theatreDetail, setTheatre] = useState([]);
  const [thId, setThId] = useState(0);

  useEffect(() => {
    getTheatre();
  }, []);

  const getTheatre = async () => {
    const response = await fetch(
      `https://localhost:44335/api/Ticket/GetTheatre`
    );
    const data = await response.json();
    setTheatre(data);
    console.log(data);
  };

  const Book = (Id) => {
    console.log(Id);
    setThId(Id);
    navigate({
      pathname: "/movieList",
      search: createSearchParams({
        id: String(Id),
      }).toString(),
    });
  };

  return (
    <div style={{ width: "1900px", height: "900px", overflowY: "scroll" }}>
      {/* {theatreDetail.map((t) => (
        <Card sx={{ width: "500px" }} style={{ margin: "80px" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Theatre Name : {t.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location : {t.place}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Screen count : 4
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => Book(t.theatreId)}
            >
              Book
            </Button>
          </CardActions>
        </Card>
      ))} */}
      <MDBRow
        className="row-cols-1 row-cols-md-3 g-3"
        style={{ width: "1200px" }}
      >
        {theatreDetail.map((t) => (
          <MDBCol>
            <MDBCard>
              <MDBCardImage
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF51ueN9POMek8rAdksxAwdoa93UwZWrOE0w&usqp=CAU"
                alt="..."
                position="top"
              />
              <MDBCardBody>
                <MDBCardTitle>Theatre Nme: {t.name}</MDBCardTitle>
                <MDBCardText>Place: {t.place}</MDBCardText>
                <MDBCardText>Screen count : 4</MDBCardText>
                <button onClick={() => Book(t.theatreId)}>Movie List</button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}

export default Home;

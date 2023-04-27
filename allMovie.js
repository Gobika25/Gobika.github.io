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

function AllMovie(props) {
  console.log(props);
  let navigate = useNavigate();
  const [theatreDetail, setTheatre] = useState([]);
  const [thId, setThId] = useState(0);

  useEffect(() => {
    getTheatre();
  }, []);

  const getTheatre = async () => {
    const response = await fetch(`https://localhost:44335/api/Ticket/GetMovie`);
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
      <MDBRow
        className="row-cols-1 row-cols-md-3 g-3"
        style={{ width: "1500px" }}
      >
        {theatreDetail.map((t) => (
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
                {/* <button onClick={() => Book(t.theatreId)}>BOOK</button> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </div>
  );
}

export default AllMovie;

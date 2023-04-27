import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Button } from "bootstrap";
import { Paper, Grid } from "@mui/material";
import {
  ArgumentAxis,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function MovieRating() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState([]);
  const [rating, setRating] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    const response = await fetch(`https://localhost:44335/api/Ticket/GetMovie`);
    const data = await response.json();
    setMovies(data);
    console.log(data);
    const MovieName = data.map((i) => i.name);
    setMovieName(MovieName);
    const rating = data.map((i) => i.rating);
    setRating(rating);
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Grid container direction={"row"} style={{ width: "1500px" }}>
        <Grid lg={6}>
          <div>
            <h2>New Release Movie Rating:</h2>
          </div>
          <div>
            <Bar
              data={{
                labels: movieName,
                datasets: [
                  {
                    label: "Rating",
                    data: rating,
                    backgroundColor: ["aqua", "green"],
                    borderColor: ["aqua", "green"],
                    borderWidth: 0.5,
                    barThickness: 25,
                  },
                ],
              }}
              height={600}
              width={800}
              options={{
                animation: false,
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontSize: 15,
                  },
                },
              }}
            />
          </div>
        </Grid>
        <Grid lg={6}>
          <div>
            <h2>Trending Movie:</h2>
          </div>
          <div>
            <Carousel
              activeIndex={index}
              onSelect={handleSelect}
              style={{ width: "auto", height: "500px" }}
            >
              {movies.map((t) => (
                <Carousel.Item>
                  <img
                    className="d-block"
                    src={t.imageLink}
                    alt="First slide"
                    style={{
                      width: "1000px",
                      height: "600px",
                      paddingLeft: "70px",
                    }}
                  />
                  <Carousel.Caption>
                    <h3>{t.name}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

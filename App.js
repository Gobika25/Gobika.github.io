import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Admin from "./admin";
import Movie from "./movieList";
import Sidenav from "./sidenev";
import AllMovie from "./allMovie";
import History from "./history";
import MovieRating from "./barchart";
import AddMovie from "./addMovie";
import AddTheatre from "./addTheatre";
function App() {
  const location = useLocation();

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      {location.pathname !== "/login" ? <Sidenav /> : ""}

      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" Component={() => <Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/movieList" element={<Movie />} />
          <Route path="/allmovie" element={<AllMovie />} />
          <Route path="/history" element={<History />} />
          <Route path="/barchart" element={<MovieRating />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/addTheatre" element={<AddTheatre />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

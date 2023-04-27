// import React from "react";

// function Login(props) {
//   return <div>Hello</div>;
// }

// export default Login();
import React from "react";
import { useEffect, useState } from "react";
import { getUser } from "./loginservice.js";
import { useNavigate } from "react-router-dom";
import Movie from "./movieList.js";
import Home from "./home.js";
import { useLocation } from "react-router-dom";

export default function Login(props) {
  let [authMode, setAuthMode] = useState("signin");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  let navigate = useNavigate();
  const submit = async () => {
    const response = await fetch(
      `https://localhost:44335/GetUser?emailId=${emailId}&password=${password}`
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    localStorage.setItem("userId", JSON.stringify(data[0]));
    console.log(localStorage.getItem("userId"));
    const userDetail = data;
    setUserDetails(data);
    if (data.length > 0) {
      if (userDetail[0].role === 1) {
        navigate("/barchart");
      } else if (userDetail[0].role === 2) {
        navigate("/addMovie");
      }
    } else {
      navigate("/");
    }
  };

  const handleChange = (event) => {
    setEmailId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handlePasswordChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={submit}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
}

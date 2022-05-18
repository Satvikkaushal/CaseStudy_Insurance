import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";


export default function Header() {
  const style = {
    width: "100%",
    textAlign: "Right",
    color: "white",
    fontSize: "50px",
  
  };
  const location = useLocation();

  return (
    <div style={style}>
      {" "}
      {location.pathname == "/home" ? (
        <Link to="/dashboard" style={{  textDecoration: 'none'}}>
          <Button variant="contained" color="primary">
            View Dashboard
          </Button>
        </Link>
      ) : (
        <Link to="/home" style={{  textDecoration: 'none'}}>
          <Button variant="contained" color="primary">
            Go to Home
          </Button>
        </Link>
      )}
    </div>
  );
}

import React from "react";
import "./footer.css";
import { applestore, playStore } from "../../../assets";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h2>Download Our App</h2>
        <p>Download the app for Android and iOS devices</p>
        <div className="app-download-links">
          <a href="#">
            <img src={playStore} alt="Play Store" />
          </a>
          <a href="#">
            <img src={applestore} alt="App Store" />
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h1 style={{ color: "brown" }}>Ecommerce</h1>
        <p>High Quality is our first priority</p>
      </div>
      <div className="footer-column">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FacebookIcon style={{ color: "white" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ color: "white" }} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon style={{ color: "white" }} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

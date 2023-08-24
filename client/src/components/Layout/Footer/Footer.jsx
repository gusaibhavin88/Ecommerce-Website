import React from "react";
import "./footer.css";
import { applestore } from "../../../assets";
import { playStore } from "../../../assets";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <div className="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <a href="">
                        {" "}
                        <img src={playStore} alt="" />
                    </a>
                    <a href="">
                        {" "}
                        <img src={applestore} alt="" />
                    </a>
                </div>
            </div>
            <div className="middleFooter">
                <h1>Ecommerce</h1>
                <h4>High Quality is our first priority</h4>
                <h4>High Quality is our first priority</h4>
            </div>
            <div className="rightFooter">
                <h1 style={{ fontSize: "1rem" }}>Follow Us</h1>
                <div className="rightFooterLinks"
                    style={{ display: "flex", flexDirection: "row", color: "white" }}
                >
                    <a href="">
                        <FacebookIcon style={{ color: "white" }} />
                    </a>
                    <a href="">
                        <InstagramIcon style={{ color: "white" }} />
                    </a>
                    <a href="">
                        <LinkedInIcon style={{ color: "white" }} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;

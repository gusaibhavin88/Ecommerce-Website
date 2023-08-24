import React from "react";
import "./footer.css";
import { applestore, playStore } from "../../../assets";

const Footer = () => {
    return (
        <div className="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone </p>
                <a href=""> <img src={applestore} alt="" /> </a>
                <a href=""> <img src={applestore} alt="" /> </a>
            </div>
            <div className="middleFooter">
                <h1>Ecommerce</h1>
                <h4>High Quality is our first priority</h4>
                <h4>High Quality is our first priority</h4>
            </div>
            <div className="rightFooter">
                <h1>Follow Us</h1>
                <h4>Instagram</h4>
                <h4>Youtube</h4>
                <h4>Facebook</h4>
            </div>
        </div>
    );
};

export default Footer;

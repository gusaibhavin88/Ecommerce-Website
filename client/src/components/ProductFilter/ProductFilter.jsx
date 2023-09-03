import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import "./ProductFilter.css";
import { fetchProducts } from "../../Redux/Product/ProductAction";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import debounce from "lodash/debounce"; // Import the debounce function
import { useMediaQuery } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

// function toggleColor(element) {
//   element.classList.toggle("color-changed");
// }

const ProductFilter = () => {
  const isSmallScreen = useMediaQuery("(max-width: 1024px)"); // Define your media query here
  const dispatch = useDispatch();
  const [priceValue, setPriceValue] = useState([0, 25000]);
  const [ratingValue, setRatingValue] = useState(0);
  const [category, setCategory] = useState("");

  const catagory = [
    "Laptop",
    "Footwear",
    "Bottoms",
    "Tops",
    "Camera",
    "SmartPhone",
  ];

  const handleChangePrice = (event, newValue) => {
    setPriceValue(newValue);
  };
  const handleChangeRating = (event, newValue) => {
    setRatingValue(newValue);
  };
  const handleChangeCategory = (e) => (newValue) => {
    e.preventDefault();
    setCategory(String(newValue)); // Convert newValue to a string
  };

  // Use debounce to delay the API request
  const delayedFetchProducts = debounce(
    (keyword, currentPage, price, rating, category) => {
      dispatch(
        fetchProducts({ keyword, currentPage, price, rating, category })
      );
    },
    1000 // Delay time in milliseconds
  );

  useEffect(() => {
    delayedFetchProducts("", 1, priceValue, ratingValue, category);
    // Cancel the debounce function if priceValue or ratingValue changes again within 1 second
    return () => delayedFetchProducts.cancel();
  }, [priceValue, ratingValue, category]);

  return (
    <div className="productfilter">
      <SearchBar />
      <div>
        <h6>Price</h6>
        <Slider
          size={isSmallScreen ? "small" : "large"} // Use 'small' size on small screens
          getAriaLabel={() => "Temperature range"}
          value={priceValue}
          onChange={handleChangePrice}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={25000}
        />
      </div>
      <div>
        <h6>Rating</h6>
        <Slider
          size={isSmallScreen ? "small" : "large"} // Use 'small' size on small screens
          getAriaLabel={() => "Temperature range"}
          value={ratingValue}
          onChange={handleChangeRating}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={5}
        />
      </div>
      <div>
        {" "}
        <h4>Description</h4>
        <div className="catagery">
          {catagory &&
            [...catagory, "Reset"].map((item) => {
              return (
                <span
                  className="filterBtn"
                  style={item === "Reset" ? { color: "red" } : null}
                  onClick={() => {
                    setCategory(String(item));
                    toggleColor(this);
                  }}
                >
                  {item}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

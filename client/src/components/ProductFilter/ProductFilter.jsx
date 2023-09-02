import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./ProductFilter.css";
import { fetchProducts } from "../../Redux/Product/ProductAction";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";

function valuetext(value) {
  return `${value}°C`;
}

const ProductFilter = () => {
  const dispatch = useDispatch();
  const [priceValue, setPriceValue] = useState([0, 25000]);
  const [ratingValue, setRatingValue] = useState([0, 25000]);
  const [category, setCategory] = useState(["Laptop"]);

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
    console.log(newValue);
    e.preventDefault();
    setCategory(String(newValue)); // Convert newValue to a string
    console.log(newValue);
  };

  useEffect(() => {
    dispatch(fetchProducts({ keyword: "", currentPage: 1, price: priceValue }));
  }, [dispatch, priceValue, ratingValue, category]);

  return (
    <div className="productfilter">
      <SearchBar />
      <h6>Price</h6>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={priceValue}
        onChange={handleChangePrice}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={25000}
      />
      <h6>Rating</h6>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={ratingValue}
        onChange={handleChangeRating}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={25000}
      />
      <h6>Description</h6>
      <div className="catagery">
        {catagory &&
          catagory.map((item) => {
            return (
              <span
                className="filterBtn"
                onClick={() => setCategory(String(item))}
              >
                {item}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default ProductFilter;

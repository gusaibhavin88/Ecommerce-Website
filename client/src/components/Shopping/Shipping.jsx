import React, { useState } from "react";
import "./shipping.css";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import { Country, State } from "country-state-city";
import FlagIcon from "@mui/icons-material/Flag";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { useForm } from "react-hook-form";
import CustomizedSteppers from "./CheckOutSteps/CheckOutSteps";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Shipping = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const stepStage = 0;

  const onSubmit = (data) => {
    console.log(data);
    navigate("/order/confirm");
  };

  return (
    <div className="shipping">
      <MetaData title="Shipping" />
      <CustomizedSteppers stepStage={stepStage} />
      <div className="homeHeading">
        <h2>Shipping Details</h2>
      </div>
      <form>
        <div
          className="formperent"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <Box
            className="textfiled"
            sx={{ display: "flex", alignItems: "flex-end" }}
            style={{ alignItems: "center", display: "flex" }}
          >
            <HomeIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              style={{ fontSize: "2rem" }}
            />
            <TextField
              className="textfiled"
              id="input-with-sx"
              variant="outlined"
              primary
              {...register("address")}
              placeholder="Enter your address"
            />
          </Box>
          <Box
            className="textfiled"
            sx={{ display: "flex", alignItems: "flex-end" }}
            style={{ alignItems: "center" }}
          >
            <LocationCityIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              style={{ fontSize: "2rem" }}
            />
            <TextField
              className="textfiled"
              id="input-with-sx"
              variant="outlined"
              primary
              {...register("city")}
              placeholder="Enter your city"
            />
          </Box>
          <Box
            className="textfiled"
            sx={{ display: "flex", alignItems: "flex-end" }}
            style={{ alignItems: "center" }}
          >
            <LocationOnIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              style={{ fontSize: "2rem" }}
            />
            <TextField
              className="textfiled"
              id="input-with-sx"
              variant="outlined"
              type="number"
              primary
              {...register("pinCode")}
              placeholder="Enter your pin code"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </Box>
          <Box
            className="textfiled"
            sx={{ display: "flex", alignItems: "flex-end" }}
            style={{ alignItems: "center" }}
          >
            <CallIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              style={{ fontSize: "2rem" }}
            />
            <TextField
              className="textfiled"
              id="input-with-sx"
              variant="outlined"
              primary
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              {...register("phoneNo")}
              placeholder="Enter your phone number"
            />
          </Box>
          <Box
            className="textfiled"
            sx={{ display: "flex", alignItems: "flex-end" }}
            style={{ alignItems: "center" }}
          >
            <FlagIcon
              sx={{ color: "action.active", mr: 1, my: 0.5 }}
              style={{ fontSize: "2rem" }}
            />
            <Select
              variant="outlined"
              fullWidth
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value={""}>none</MenuItem>
              {Country &&
                Country.getAllCountries().map((item, index) => {
                  return (
                    <MenuItem value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </Box>
          {country && (
            <Box
              className="textfiled"
              sx={{ display: "flex", alignItems: "flex-end" }}
              style={{ alignItems: "center" }}
            >
              <CorporateFareIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                style={{ fontSize: "2rem" }}
              />

              <Select variant="outlined" {...register("city")} fullWidth>
                <MenuItem value={""}>State</MenuItem>
                {country &&
                  State.getStatesOfCountry(country).map((item, index) => {
                    return (
                      <MenuItem value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Box>
          )}
        </div>
        <Button
          style={{ marginTop: "1rem" }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
        >
          Add To Cart
        </Button>
      </form>
    </div>
  );
};

export default Shipping;

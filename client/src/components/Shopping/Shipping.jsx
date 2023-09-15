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

const Shipping = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  return (
    <div className="shipping">
      <div className="homeHeading">
        <h2>Shipping Details</h2>
      </div>
      <form>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box
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
              placeholder="Enter your address"
            />
          </Box>
          <Box
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
              placeholder="Enter your city"
            />
          </Box>
          <Box
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
              primary
              placeholder="Enter your pin code"
            />
          </Box>
          <Box
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
              placeholder="Enter your phone number"
            />
          </Box>
          <Box
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
              sx={{ display: "flex", alignItems: "flex-end" }}
              style={{ alignItems: "center" }}
            >
              <CorporateFareIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
                style={{ fontSize: "2rem" }}
              />

              <Select variant="outlined" fullWidth>
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
        <Button style={{ marginTop: "1rem" }} variant="contained">
          Add To Cart
        </Button>
      </form>
    </div>
  );
};

export default Shipping;

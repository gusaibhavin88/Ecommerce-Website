import React, { useEffect, useState } from "react";
import "./shipping.css";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TableContainer,
  TextField,
} from "@mui/material";
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateShipping } from "../../Redux/Cart/CartSlice";

const Shipping = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultValues = {
    address: "",
    city: "",
    pinCode: "",
    phoneNo: "",
    country: country,
    state: state,
  };
  const { register, handleSubmit, setValue, getValues, formState } = useForm({
    defaultValues,
  });
  const { shippingDetail } = useSelector((state) => state.cart);
  const stepStage = 0;
  const onSubmit = (data) => {
    const newData = {
      ...data,
      phoneNo: Number(data.phoneNo),
      pinCode: Number(data.pinCode),
    };
    dispatch(updateShipping(newData));
    navigate("/order/confirm");
  };

  useEffect(() => {
    if (shippingDetail) {
      const keys = Object.keys(shippingDetail);
      keys.map((item) => {
        if (item === "country") {
          setCountry(shippingDetail[item]);
        }
        if (item === "state") {
          setState(shippingDetail[item]);
        }
        setValue(item, shippingDetail[item]);
      });
    }
  }, []);

  return (
    <div className="shipping">
      <MetaData title="Shipping" />
      <CustomizedSteppers stepStage={stepStage} />
      <div className="homeHeading">
        <h2>Shipping Details</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              className="inputText"
              id="input-with-sx"
              variant="outlined"
              primary
              name="address"
              {...register("address", { required: true })}
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
              className="inputText"
              id="input-with-sx"
              variant="outlined"
              primary
              name="city"
              {...register("city", { required: true })}
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
              className="inputText"
              id="input-with-sx"
              variant="outlined"
              type="number"
              primary
              name="pinCode"
              {...register("pinCode", { required: true })}
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
              className="inputText"
              id="input-with-sx"
              variant="outlined"
              type="text" // Change the type to text to allow input of numeric characters
              name="phoneNo"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                maxLength: 10, // Limit input to 10 characters
                minLength: 10, // Ensure at least 10 characters are entered
              }}
              {...register("phoneNo", { required: true })}
              placeholder="Enter your 10-digit phone number"
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
              value={country}
              name="country"
              {...register("country", { required: true })}
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

              <Select
                variant="outlined"
                {...register("state", { required: true })}
                name="state"
                fullWidth
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
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
          type="submit"
          style={{ marginTop: "1rem" }}
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={formState?.isValid ? false : true}
        >
          Add To Cart
        </Button>
      </form>
    </div>
  );
};

export default Shipping;

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import "./PasswordUpdateDialog.css";
import { useForm } from "react-hook-form";
import {
  updatePasswordAction,
  updateProfileAction,
} from "../../../Redux/User/UserAction";
import { clearError, clearMessage } from "../../../Redux/User/UserSlice";
import { useSnackbar } from "../../context/SnackbarContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function PasswordUpdateDialog({ user }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { handleClick } = useSnackbar();
  const { message, error, isUpdated } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const onComplete = (response) => {
    handleClick("success", "Password has changed Login again");
  };

  const onError = (response) => {
    console.log(response);
  };

  const onSubmit = (data) => {
    if (data.oldPassword !== data.confOldPassword) {
      handleClick("error", "Old Password and Confirm Old Password must match");
      return;
    }
    dispatch(
      updatePasswordAction({
        functions: {
          onComplete,
          onError,
          formData: data,
        },
      })
    );
    handleClose();
  };

  useEffect(() => {
    if (user) {
      Object.keys(user).forEach((key) => {
        if (key === "name" || key === "email") {
          setValue(key.toString(), user[key]);
        } else if (key === "avatar") {
          setAvatarPreview(user[key].url); // Fix this line
        }
      });
    }
  }, []);

  useEffect(() => {
    if (error) {
      handleClick("error", error);
      dispatch(clearError());
    }
    if (message) {
      handleClick("success", message);
      dispatch(clearMessage());
    }
  }, [dispatch, isUpdated, error, message]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change Password
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <br />
            <TextField
              fullWidth
              label="Old Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              className="mb-3"
              {...register("oldPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <TextField
              fullWidth
              label="Confirm Old Password"
              type="password"
              variant="outlined"
              className="mb-3"
              {...register("confOldPassword")}
            />
            <br />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              className="mb-3"
              {...register("newPassword")}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PasswordUpdateDialog;

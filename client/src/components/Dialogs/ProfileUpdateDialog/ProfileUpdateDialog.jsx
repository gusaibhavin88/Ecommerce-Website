import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Rating from "@mui/material/Rating"; // Import Rating component from the correct path
import { useDispatch, useSelector } from "react-redux";
import { createProductReview } from "../../../Redux/Product/ProductAction";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import "./ProfileUpdateDialog.css";
import { profile } from "../../../assets";
import { useForm } from "react-hook-form";
import { updateProfileAction } from "../../../Redux/User/UserAction";
import { clearError, clearMessage } from "../../../Redux/User/UserSlice";
import { useSnackbar } from "../../context/SnackbarContext";
import { updateProfile } from "../../../Redux/Auth/AuthSlice";

function ProfileUpdateDialog({ user }) {
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { handleClick } = useSnackbar();
  const { message, error, isUpdated } = useSelector((state) => state.user);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const onImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = await e.target.files[0];
      if (img) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const onComplete = (response) => {};
  const onError = (response) => {};

  const onSubmit = (data) => {
    const myForm = new FormData();
    // Add data from the 'datas' object to the FormData
    for (const key in data) {
      myForm.append(key, data[key]);
    }
    myForm.set("avatar", avatar);
    // console.log([...myForm.entries()]);
    dispatch(
      updateProfileAction({
        functions: {
          onComplete,
          onError,
          formData: myForm,
        },
      })
    );
    handleClose();
    // navigate("/products");
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
        Edit Profile
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
              label="Username"
              variant="outlined"
              className="mb-3"
              name="name"
              {...register("name")}
            />
            <br />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              className="mb-3"
              {...register("email")}
            />
            <div className="inputdiv">
              <img src={avatarPreview} alt="Not found" />
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={onImageChange}
              />
            </div>
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

export default ProfileUpdateDialog;

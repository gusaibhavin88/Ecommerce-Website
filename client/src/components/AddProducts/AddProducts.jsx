import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../context/SnackbarContext";
import { clearError, clearMessage } from "../../Redux/Product/ProductSlice";
import { createProductAction } from "../../Redux/Product/ProductAction";
import { profile } from "../../assets";
import "./AddProducts.css";

const AddProducts = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, reset } = useForm();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const { handleClick } = useSnackbar();
  const { error, message } = useSelector((state) => state.products);
  const category = [
    "Grocery",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Appliances",
  ];

  const getFormData = (data) => {
    const myForm = new FormData();
    // Add data from the 'datas' object to the FormData
    for (const key in data) {
      myForm.append(key, data[key]);
    }
    myForm.set("avatar", avatar);
    // console.log([...myForm.entries()]);

    dispatch(createProductAction(myForm));
    reset();
    setAvatarPreview("");
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

  useEffect(() => {
    if (error) {
      handleClick("error", error);
      dispatch(clearError());
    }
    if (message) {
      console.log(message);
      handleClick("success", message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  return (
    <Form style={{ marginTop: "2rem" }}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Product name</Form.Label>
        <Form.Control
          type="text"
          maxLength={20}
          placeholder="Enter product name"
          {...register("name", { required: true })}
        />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter product description"
          {...register("description", { required: true })}
        />
      </Form.Group>

      {/* Category */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" {...register("category", { required: true })}>
          {category &&
            ["Select", ...category].map((item) => {
              return <option>{item}</option>;
            })}
          {/* Add more category options as needed */}
        </Form.Control>
      </Form.Group>

      {/* Price */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter price"
          {...register("price", { required: true })}
        />
      </Form.Group>

      {/* Stock */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter stock quantity"
          {...register("stock", { required: true })}
        />
      </Form.Group>

      {/* File */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlFile1">
        <Form.Label>Upload File</Form.Label>
        <div className="fileImg">
          <img src={avatarPreview} alt="Not found" className="preImg" />
          <Form.Control
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={onImageChange}
          />
        </div>
      </Form.Group>

      {/* Create Button */}
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit(getFormData)}
      >
        Create
      </Button>
    </Form>
  );
};

export default AddProducts;

import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createProductReview,
  fetchproductDetails,
  updateProductAction,
} from "../../../Redux/Product/ProductAction";
import { profile } from "../../../assets";

function ProductUpdateDialog({ show, handleClose, productId }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [review, setReview] = useState({});
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const { product } = useSelector((state) => state.products);

  const onComplete = (response) => {
    // dispatch(updateReview(response));
    handleClick("success", response.data.message);
  };
  const onError = (response) => {};
  const onSubmit = async (data) => {
    const myForm = new FormData();
    for (const key in data) {
      myForm.append(key, data[key]);
    }
    myForm.set("avatar", avatar);
    // console.log([...myForm.entries()]);

    dispatch(
      updateProductAction({
        functions: {
          id: productId,
          formData: myForm,
          onComplete: onComplete,
          onError: onError,
        },
      })
    );
  };

  const category = [
    "Grocery",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Appliances",
  ];

  const getProductInfo = () => {
    dispatch(
      fetchproductDetails({
        functions: {
          // onComplete,
          id: productId,
        },
      })
    );
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
    setOpen(show);
  }, [show]);

  useEffect(() => {
    for (const key in product) {
      setValue(key, product[key]);
      if (key === "image") {
        setAvatarPreview(product.image[0].url);
      }
    }
  }, [product]);

  useEffect(() => {
    if (productId) {
      getProductInfo();
    }
  }, [productId]);

  return (
    <>
      {/* <EditIcon onClick={handleShow} /> */}

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ marginTop: "2rem" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
            </Form.Group>

            {/* Description */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
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
              <Form.Control
                as="select"
                {...register("category", { required: true })}
              >
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
              // onClick={handleSubmit(getFormData)}
            >
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductUpdateDialog;

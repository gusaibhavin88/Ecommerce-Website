import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Rating from "@mui/material/Rating"; // Import Rating component from the correct path
import { useDispatch } from "react-redux";
import { createProductReview } from "../../Redux/Product/ProductAction";
import { useParams } from "react-router-dom";

function ReviewDialog() {
  const dispatch = useDispatch();
  const params = useParams();
  const [show, setShow] = useState(false);
  const [review, setReview] = useState({});

  const onhandleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const onSubmit = async () => {
    await dispatch(createProductReview({ ...review, productId: params.id }));
    setReview({});
    setShow(false);
    handleClose(); // Close the modal after submitting
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Submit Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Give Rating</Form.Label>
            <br />
            <Rating name="rating" onChange={onhandleChange} />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <br />
              <Form.Label>Write something</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comment"
                onChange={onhandleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewDialog;

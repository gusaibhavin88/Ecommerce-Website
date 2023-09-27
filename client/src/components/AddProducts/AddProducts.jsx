import React from "react";
import { Button, Form } from "react-bootstrap";

const AddProducts = () => {
  return (
    <Form style={{ marginTop: "2rem" }}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>

      {/* Description */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>

      {/* Category */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select">
          <option>Category 1</option>
          <option>Category 2</option>
          <option>Category 3</option>
          {/* Add more category options as needed */}
        </Form.Control>
      </Form.Group>

      {/* Price */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="Enter price" />
      </Form.Group>

      {/* Stock */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="Enter stock quantity" />
      </Form.Group>

      {/* File */}
      <Form.Group className="mb-3" controlId="exampleForm.ControlFile1">
        <Form.Label>Upload File</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      {/* Create Button */}
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default AddProducts;

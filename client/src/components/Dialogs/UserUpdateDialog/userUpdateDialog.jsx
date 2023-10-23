import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../../assets";
import { findUserData } from "../../../Api/UserRequest";
import { updateUserAction } from "../../../Redux/User/UserAction";
import { clearMessage } from "../../../Redux/User/UserSlice";

function UserUpdateDialog({ show, handleClose, userId }) {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState("");
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [avatar, setAvatar] = useState("");
  const { message } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    const { role, ...otherData } = data;
    dispatch(
      updateUserAction({
        functions: {
          id: userId,
          formData: { role: role },
        },
      })
    );
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const findUser = async () => {
    const response = await findUserData(userId);
    setUserDetail(response.data.user);
  };

  useEffect(() => {
    if (userId) {
      findUser();
    }
  }, []);

  useEffect(() => {
    if (message) {
      handleClose();
      dispatch(clearMessage());
    }
  }, [dispatch, message]);

  useEffect(() => {
    for (const key in userDetail) {
      setValue(key, userDetail[key]);
    }
  }, [userDetail]);

  return (
    <>
      {/* <EditIcon onClick={handleShow} /> */}

      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ marginTop: "2rem" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="name"
                {...register("name", { required: true })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                name="email"
                {...register("email", { required: true })}
              />
            </Form.Group>

            {/* Category */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Control
                as="select"
                {...register("role", { required: true })}
              >
                {["Choose role", "Admin", "User"].map((item) => {
                  return <option>{item}</option>;
                })}
                {/* Add more category options as needed */}
              </Form.Control>
            </Form.Group>
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

export default UserUpdateDialog;

import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "../../context/SnackbarContext";
import { clearError } from "../../../Redux/Auth/AuthSlice";
import "../Register/Register.css";
import ReactLoading from "react-loading";
import { NavLink, useNavigate } from "react-router-dom";
import { logo } from "../../../assets";
import { registerUserAction } from "../../../Redux/Auth/AuthAction";
import { profile } from "../../../assets";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const { register, handleSubmit, errors } = useForm();
  const { handleClick, handleClose } = useSnackbar();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    const myForm = new FormData();
    // Add data from the 'datas' object to the FormData
    for (const key in data) {
      myForm.append(key, data[key]);
    }
    myForm.set("avatar", avatar);
    // console.log([...myForm.entries()]);

    dispatch(registerUserAction(myForm));
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
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      handleClick("error", error);
      dispatch(clearError());
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <div>
      {loading ? (
        <div className="loginloading">
          <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        </div>
      ) : (
        <Container>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <div className="border border-3 border-primary"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-uppercase ">Ecommerce</h2>
                    <p className=" mb-5">
                      Please enter your login and password!
                    </p>
                    <div className="mb-3">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email address
                          </Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email")}
                          />
                          <Form.Label className="text-center">Name </Form.Label>
                          <Form.Control
                            type="name"
                            placeholder="Enter name"
                            {...register("name")}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <p className="small">
                            <a className="text-primary" href="#!">
                              Forgot password?
                            </a>
                          </p>
                        </Form.Group>
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
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Sign Up
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Don't have an account?{" "}
                          <NavLink className="text-primary fw-bold" to="/login">
                            Log In
                          </NavLink>
                          {/* <a href="{''}" className="text-primary fw-bold">
                            Log In
                          </a> */}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

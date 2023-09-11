import React, { useEffect } from "react";
import "./Myprofile.css";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
import MetaData from "../Layout/MetaData";
import { useNavigate } from "react-router-dom";
import ProfileUpdateDialog from "../Dialogs/ProfileUpdateDialog";

const Myprofile = () => {
  const navigate = useNavigate();

  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );
  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, error]);

  return (
    <>
      {loading ? (
        <div className="loginloading">
          <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
        </div>
      ) : (
        <div className="profile">
          <MetaData title={`${user.name}'s Name`} />
          <div className="proimgprnt">
            <img
              className="proimg"
              src={`${user.avatar.url}`}
              alt="Your Profile"
            />

            <ProfileUpdateDialog user={user} />
            {/* <Button onClick={() => navigate("/updateprofile")}>
              Edit Profile
            </Button> */}
          </div>
          <div className="profiledetails">
            <div>
              <h3>Full name</h3>
              <Card.Text className="text-secondary">`${user.name}`</Card.Text>
            </div>
            <div>
              <h3>Email</h3>
              <Card.Text className="text-secondary">{user.email}</Card.Text>
            </div>
            <div>
              <h3>Joined On</h3>
              <Card.Text className="text-secondary">{user.createdAt}</Card.Text>
            </div>
            <Button>My Order</Button>

            <Button>Change password</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Myprofile;

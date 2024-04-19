import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "./../utils/config";
import { getAccessToken } from "../utils/token";
import { AuthContext } from "../context/AuthContext";

const ChangePassword = () => {
  const [credentitals, setCredentials] = useState({
    password: undefined,
    confirmPassword: undefined,
  });
  const { dispatch, emailConfirm } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    if (!emailConfirm && !getAccessToken()) {
      navigate("/forgot-password");
      alert("Error: email false");
    }
  }, [emailConfirm, navigate]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentitals.password === credentitals.confirmPassword) {
      try {
        const accessToken = getAccessToken();
        const res = await fetch(`${BASE_URL}/auth/change-password`, {
          method: "put",
          headers: {
            "content-type": "application/json",
            Authorization: accessToken === "null" ? emailConfirm : accessToken,
          },
          body: JSON.stringify({ password: credentitals.password }),
        });
        const result = await res.json();
        if (result.success) {
          localStorage.clear();
          localStorage.setItem("user", null);
          alert("Change password success, please login again!");
          dispatch({ type: "CONFIRM_EMAIL_FALSE" });
          navigate("/login");
        }
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Warning: Passwords must match!");
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Change password</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Password"
                      required
                      id="password"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Confirm password"
                      required
                      id="confirmPassword"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Confirm
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ChangePassword;

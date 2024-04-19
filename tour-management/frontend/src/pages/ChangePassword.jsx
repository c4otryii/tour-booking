import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { BASE_URL } from "./../utils/config";

const ChangePassword = () => {
  const [credentitals, setCredentials] = useState({
    email: undefined,
    phone: undefined,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(credentitals),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);
      navigate("/");
    } catch (err) {
      alert(err);
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
                      id="confimrPassword"
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

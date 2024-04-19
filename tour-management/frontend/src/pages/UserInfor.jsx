import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { convertDate } from "../utils/convertDate";

export default function UserInfor() {
  const navigate = useNavigate();
  const dataUser = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, email: null, createdAt: null };

  return (
    <>
      <Container className="my-5">
        <h2>Thông tin cá nhân</h2>
        <Form className="mt-4">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Họ tên</Label>
                <Input
                  disabled
                  readOnly
                  name="name"
                  type="text"
                  value={dataUser.username}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  disabled
                  readOnly
                  name="email"
                  type="email"
                  value={dataUser.email}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Ngày tạo</Label>
                <Input
                  disabled
                  readOnly
                  name="createdAt"
                  type="text"
                  value={convertDate(dataUser.createdAt)}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup className="mt-2">
            <Button color="danger" onClick={() => navigate("/change-password")}>
              <span className="pb-1" style={{ boxSizing: "content-box" }}>
                Thay đổi mật khẩu
              </span>{" "}
              <i class="ri-arrow-right-line pt-1"></i>
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
}

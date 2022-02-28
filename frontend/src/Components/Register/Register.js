import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Toast } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";


const Register = () => {
  const [userData, setUserData] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newUserData = { ...userData };
    newUserData[name] = value;
    setUserData(newUserData);
  };
  console.log(userData);
  const handleOnClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (userData.password !== userData.password2) {
      alert("Your password did not match");
      return;
    }
    try {
      const config = {
        Headers: {
          "Content-type":"application/json"
        }
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        userData,
        config
      );
      alert("Registration Successfull")
      localStorage.setItem("userInfo", JSON.stringify(data))
      setIsLoading(false)
      navigate('/chats')
    } catch (error) {
      alert("Something Error")
    }
  }
  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              onChange={handleOnChange}
              name="name"
              type="text"
              placeholder="Enter Your Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              onChange={handleOnChange}
              name="email"
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <InputGroup>
              <Form.Control
                onChange={handleOnChange}
                name="password"
                type={show ? "text" : "password"}
                placeholder="Password"
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <InputGroup>
              <Form.Control
                onChange={handleOnChange}
                name="password2"
                type={show ? "text" : "password"}
                placeholder="Password2"
              />
              <InputGroup.Text onClick={handleOnClick}>
                <button style={{ border: "0px" }}>
                  {show ? "Show" : "Hide"}
                </button>
              </InputGroup.Text>
            </InputGroup>
            <Button className="w-100" type="submit">
              Register
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Register;

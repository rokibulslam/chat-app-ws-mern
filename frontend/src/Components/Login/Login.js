import axios from "axios";
import React, { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState('');
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
  console.log(userData)
  const handleOnClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    // if (!userData) {
    //   alert("Enter Email and Password")
    //   setIsLoading(false);
    //   return;
    // }
    
    try {
      const config = {
        Headers: {
          "Content-type":"application/json"
        }
      }
     const { data } = await axios.post(
       "http://localhost:5000/api/user/login",
       userData, config
     )
      alert("Registration Successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      navigate("/chats");
    } catch (error) {
      alert("Something Error")
    }
    setIsLoading(false)
  }
    

  
  

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit}>
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
              <InputGroup.Text onClick={handleOnClick}>
                <button style={{ border: "0px" }}>
                  {show ? "Show" : "Hide"}
                </button>
              </InputGroup.Text>
            </InputGroup>
            <Button className="w-100 btn-danger mb-2" type="submit">
              Login
            </Button>
            {isLoading && <Spinner animation="grow" variant="warning" />}
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;

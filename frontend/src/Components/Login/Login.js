import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const Login = () => {
  const [userData, setUserData] = useState();
  const [show, setShow] = useState(false);
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const newUserData = { ...userData };
    newUserData[name] = value;
    setUserData(newUserData);
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  console.log(userData);
  return (
    <div>
      <div>
        <Form>
         
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
                name="password2"
                type={show ? "text" : "password"}
                placeholder="Password"
              />
              <InputGroup.Text onClick={handleOnClick}>
                <button style={{ border: "0px" }}>
                  {show ? "Show" : "Hide"}
                </button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default Login;

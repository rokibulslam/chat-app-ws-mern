import React, { useState } from "react";
import {Tab, Tabs, Sonnet} from 'react-bootstrap'
import Login from "../../Components/Login/Login";
import Register from "../../Components/Register/Register";
const Home = () => {
  const [key, setKey] = useState("login");

  return (
    <div className="container mt-5 text-center d-flex justify-content-center">
      <div className="w-50">
        <div style={{ backgroundColor: "white" }} className="rounded-3">
          <div className=" fs-1 px-5">
            <p>Tom & Jery</p>
          </div>
        </div>
        <div style={{ backgroundColor: "white" }} className="d-flex justify-content-center rounded-3">
          <div className="">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3 fs-1"
            >
              <Tab className="" eventKey="login" title="Login">
               <Login></Login>
              </Tab>
              <Tab className="" eventKey="register" title="Register">
                <Register></Register>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from 'axios'
import gql from 'graphql-tag'
import {print} from 'graphql'
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [logincheck, setlogincheck] = useState(true);
  const [registercheck, setregistercheck] = useState(false);
  const [fullname, setfullname] = useState("")
  const [username, setusername] = useState("")
  const [passoword, setpassword] = useState("")
  let navigate = useNavigate();

  const login = gql`
  mutation login($username:String!, $password:String!){
    login(username:$username, password:$password){
        username,
        password,
        token
    }
}
  `

  const regis = gql`
  mutation register($fullname: String!, $username:String!, $password:String!){
      register(fullname: $fullname, username:$username, password:$password){
          fullname,
          username,
          password,
          token
      }
  }
  `
  return (
    <Container fluid>
      <Row>
        <Col
          xs={6}
          style={{
            paddingTop: "20%",
            paddingLeft: "15%",
            backgroundColor: "#1DA1F2",
            paddingBottom: "30%",
          }}
        >
          <div style={{ color: "white" }}>
            <h1>Twitter Clone</h1>
            <h3>FsWD final exam</h3>
          </div>
        </Col>
        <Col xs={6} style={{ backgroundColor: "black", padding: "15%" }}>
          {logincheck == true && (
            <div>
              <Form.Label style={{ color: "white" }}>Username</Form.Label>
              <Form.Control type="text" id="username_login" />
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control type="text" id="password_login" />
              <Button
                variant="primary"
                onClick={() => {
                  if (logincheck == false) {
                    setlogincheck(true);
                    setregistercheck(false);
                  }if(logincheck == true){
                    axios.post("http://localhost:4000/graphql",{
                      query : print(login),
                      variables:{
                        username: document.getElementById("username_login").value,
                        password: document.getElementById("password_login").value
                      }
                    }).then((res)=>{
                      console.log(res.data)
                      localStorage.setItem("token", res.data.data.login.token)
                      let data = localStorage.getItem("token")
                      if(!data == false){
                        navigate("/home")
                      }else{
                        alert("incorrect username or password")
                      }
                    })
                  }
                }}
                style={{ marginTop: "3%" }}
              >
                Login
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (registercheck == false) {
                    setlogincheck(false);
                    setregistercheck(true);
                  }
                }}
                style={{ marginTop: "3%", marginLeft: "3%" }}
              >
                Register
              </Button>
            </div>
          )}
          {registercheck == true &&
            <div>
              <Form.Label style={{ color: "white" }}>Fullname</Form.Label>
              <Form.Control type="text" id="fullname_regis"/>
              <Form.Label style={{ color: "white" }}>Username</Form.Label>
              <Form.Control type="text" id="username_regis" />
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control type="text" id="password_regis" />
              <Button
                variant="primary"
                onClick={() => {
                  if (registercheck) {
                    axios.post("http://localhost:4000/graphql", {
                        query : print(regis),
                        variables:{
                            fullname: document.getElementById("fullname_regis").value,
                            username: document.getElementById("username_regis").value,
                            password: document.getElementById("password_regis").value                        }
                    }).then((res)=>{
                        console.log(res.data)
                    })
                    setlogincheck(true);
                    setregistercheck(false);
                    alert("Regis Complete")
                  }
                }}
                style={{ marginTop: "3%", marginLeft: "3%" }}
              >
                Register
              </Button>
            </div> 
          }
        </Col>
      </Row>
    </Container>
  );
}

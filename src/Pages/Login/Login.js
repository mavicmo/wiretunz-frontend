import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../SignUp/signup.css";
import FormInput from "../../components/FormInputs/FormInputs";
import React from "react";
import AuthService from "../../services/authServices";

import { Container, Form } from "react-bootstrap";
import "./login.css";

const Login = () => {
  const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
  // useState for the values
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // const [data, setData] = useState();

  const navigate = useNavigate();

  // const location = useLocation();
  // const { fromData } = location.state;
  // useState for the submit Button
  const [submitted, setSubmitted] = useState(false);

  // static setting for the input values
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  // handles the submit button for a sign up
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (values.email && values.password) {
        // // connects to the backend server to set the values
        // axios.post("http://localhost:3001/users/login/", values).then((res) => {
        //   console.log("User has logged in!");
        //   console.log(res.data);
        //   setData(res.data);
        //   localStorage.setItem("uid", JSON.stringify(res.data));
        AuthService.login(values.email, values.password).then(() => {
          navigate("/home");
          window.location.reload();
        });
      }

      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  // setting the values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // console.log(data);
  return (
    <>
      <Container className="d-flex justify-content-center mt-2">
        <div className="mainDiv ">
          <div className="header d-flex justify-content-center mb-2">
            <h1>WireTunz</h1>
          </div>

          <form className="formDiv" onSubmit={handleSubmit}>
            <div className="h1Div py-2">
              <h1 className="loginIn">Log In</h1>
            </div>

            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="d-flex flex-column">
              <button type="submit" className="btnDiv btn btn-success btn-lg">
                Log In
              </button>
            </div>
            <p className="no-account">
              Don't have an account?{" "}
              <Link style={{ marginLeft: ".2rem" }} to="/signup">
                {" "}
                SIGN UP!
              </Link>
            </p>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;

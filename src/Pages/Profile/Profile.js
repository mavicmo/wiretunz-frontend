import React from "react";
import axios from "axios";
import AuthService from "../../services/authServices";
import NavBar from "../../components/NavBar/Navbar";
import FormInput from "../../components/FormInputs/FormInputs";
import authHeader from "../../services/authHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Bar from "../../components/NavBar/Navbar";
import { Button, Fade, Container, Card } from "react-bootstrap";

function Profile() {
  let currentUser = AuthService.getCurrentUser();
  // useState for the values
  const [values, setValues] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: currentUser.password,
  });

  // useEffect(() => {}, [currentUser]);
  // useState for the submit Button
  const [submitted, setSubmitted] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  // static setting for the input values
  const inputs = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First Name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last Name should be 3-16 characters and shouldn't include any special character!",
      label: "Last Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
  ];

  // setting the values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handles the submit button for a sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    changeUserProfile();
  };

  const changeUserProfile = async () => {
    try {
      if (values.firstName && values.lastName) {
        // setValid(true);
        console.log(currentUser);
        // connects to the backend server to set the values
        axios
          .put(`http://localhost:3001/users/${currentUser._id}`, values, {
            headers: { authorization: currentUser.token },
          })
          .then((response) => {
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response.data.data));

            currentUser = AuthService.getCurrentUser();
          })
          .then(() => {
            navigate("/profile");
            window.location.reload();

            setSubmitted(true);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Bar />
      <Container className="d-flex flex-column py-2">
        <div className="user">
          <form className="update" onSubmit={handleSubmit}>
            {edit ? (
              inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))
            ) : (
              <Card>
                <Card.Body>
                  <div className="user-information">
                    <h2>
                      First Name:{" "}
                      {currentUser.firstName.charAt(0).toUpperCase() +
                        currentUser.firstName.slice(1)}
                    </h2>
                    <h2>
                      Last Name:{" "}
                      {currentUser.lastName.charAt(0).toUpperCase() +
                        currentUser.lastName.slice(1)}
                    </h2>
                    <h2>
                      Email:{" "}
                      {currentUser.email.charAt(0).toUpperCase() +
                        currentUser.email.slice(1)}
                    </h2>
                  </div>
                </Card.Body>
              </Card>
            )}
            {edit ? (
              <div className="d-flex flex-column">
                <button className="btn btn-success btn-sm">
                  Submit Changes
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="btn btn-danger btn-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <Container
                style={{ textAlign: "center" }}
                className="d-flex flex-column"
              >
                <button
                  type="submit"
                  onClick={() => setEdit(true)}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
              </Container>
            )}
          </form>
        </div>
      </Container>
    </>
  );
}

export default Profile;

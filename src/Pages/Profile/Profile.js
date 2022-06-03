import React from "react";
import axios from "axios";
import AuthService from "../../services/authServices";
import NavBar from "../../components/NavBar/Navbar";
import FormInput from "../../components/FormInputs/FormInputs";
import authHeader from "../../services/authHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

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
      {/* <NavBar /> */}

      <div>
        <form className="formDiv" onSubmit={handleSubmit}>
          <h1 className="h1Div">
            {" "}
            Hello{" "}
            {currentUser.firstName.charAt(0).toUpperCase() +
              currentUser.firstName.slice(1)}
          </h1>
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
          )}
          {edit ? (
            <div className="btn">
              <button className="btnDiv">Submit Changes</button>
              <button onClick={() => setEdit(false)} className="btnDiv">
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="submit"
              onClick={() => setEdit(true)}
              className="btnDiv"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Profile;

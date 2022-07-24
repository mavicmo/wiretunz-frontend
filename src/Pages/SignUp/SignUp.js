import { useState } from "react";
import axios from "axios";
import "./signup.css";
import FormInput from "../../components/FormInputs/FormInputs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
const SignUp = () => {
  const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
  // useState for the values
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  // useState for the submit Button
  const [submitted, setSubmitted] = useState(false);
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
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },

    {
      id: 4,
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

    if (
      values.firstName &&
      values.lastName &&
      values.email &&
      values.password
    ) {
      // setValid(true);

      // connects to the backend server to set the values
      axios
        .post(URL + "signup/", values)
        .then(() => {
          console.log("User has been signed up.");
          setSubmitted(true);
        })
        .then(() => {
          navigate("/");
          window.location.reload();

          setSubmitted(true);
        });
    }
  };

  // setting the values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container className="d-flex justify-content-center mt-2">
      <div className="mainDiv">
        <div className="header d-flex justify-content-center mb-2">
          <h1>WireTunz</h1>
        </div>
        <form className="formDiv" onSubmit={handleSubmit}>
          <div className="h1Div py-2">
            <h1 className="signup">Sign Up</h1>
          </div>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          {/* <button>Sign Up!</button> */}
          {submitted ? (
            <Link to="/">
              <div className="d-flex flex-column">
                <button type="submit" className="btnDiv btn btn-success btn-lg">
                  Sign Up!
                </button>
              </div>
            </Link>
          ) : (
            <div className="d-flex flex-column">
              <button type="submit" className="btnDiv btn btn-success btn-lg">
                Sign Up!
              </button>
            </div>
          )}

          <p className="no-account">
            Already have an account?{" "}
            <Link style={{ marginLeft: ".2rem" }} to="/">
              {" "}
              LOGIN!
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;

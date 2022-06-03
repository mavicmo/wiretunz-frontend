import { useState } from "react";
import axios from "axios";
import "./signup.css";
import FormInput from "../../components/FormInputs/FormInputs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
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
        .post("http://localhost:3001/users/signup/", values)
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
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
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
            <button>Sign Up!</button>
          </Link>
        ) : (
          <button>Sign Up!</button>
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
  );
};

export default SignUp;

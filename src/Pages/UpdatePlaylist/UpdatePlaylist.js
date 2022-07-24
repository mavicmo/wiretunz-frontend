import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Fade, Container, Card } from "react-bootstrap";
import FormInput from "../../components/FormInputs/FormInputs";
import { useParams } from "react-router-dom";
import Bar from "../../components/NavBar/Navbar";
import AuthService from "../../services/authServices";
function UpdatePlaylist(props) {
  const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
  const navigate = useNavigate();
  const playlistID = useParams();
  const currentUser = AuthService.getCurrentUser();
  const id = playlistID.playlistid;

  const [values, setValues] = useState({
    name: "Enter Name",
    desc: "Enter Desc",
    img: "Enter Img",
  });
  console.log(values.name);
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "name",
      errorMessage: "Please do not leave empty!",
      label: "name",
      required: true,
    },
    {
      id: 2,
      name: "img",
      type: "text",
      placeholder: "img",
      errorMessage: "Please do not leave empty!",
      label: "img",
      required: true,
    },
    {
      id: 3,
      name: "desc",
      type: "text",
      placeholder: "Desc",
      errorMessage: "Please do not leave empty!",
      label: "Desc",
      required: true,
    },
  ];

  // handles the submit button for a sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    // updatePlaylist(playlistID);
    console.log("update playlist hit");

    axios
      .put(URL + "playlist/editplaylist/" + `${id}`, values, {
        headers: { authorization: currentUser.token },
      })
      .then((res) => {
        console.log(res);
        setValues(res.data.data);
      });
    navigate("/playlists");
  };
  // setting the values
  const onChangeName = (e) => {
    console.log(e.target.value);
    setValues({ ...values, name: e.target.value });
  };
  const onChangeDesc = (e) => {
    console.log(e.target);
    setValues({ ...values, desc: e.target.value });
  };
  const onChangeImg = (e) => {
    console.log(e.target);
    setValues({ ...values, img: e.target.value });
  };
  console.log(values);
  return (
    <>
      <Bar />
      <form className="update" onSubmit={handleSubmit}>
        <h1 className="h1Div"> Edit The Playlist</h1>

        <input
          className="inputDiv"
          onChange={onChangeName}
          value={values.name}
          placeholder="Name"
          name="name"
        />

        <input
          className="inputDiv"
          onChange={onChangeDesc}
          value={values.desc}
          placeholder="Desc"
          name="desc"
        />

        <input
          className="inputDiv"
          onChange={onChangeImg}
          value={values.img}
          placeholder="Image"
          name="img"
        />

        <button type="submit" className="btnDiv">
          Submit
        </button>

        <Link to="/playlists">
          <button className="btnDiv">Cancel</button>
        </Link>
      </form>
    </>
  );
}

export default UpdatePlaylist;

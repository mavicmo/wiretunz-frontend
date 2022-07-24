import React, { useState } from "react";
import "./Playlist.css";
import axios from "axios";
import AuthService from "../../services/authServices";
import DisplayAPlaylist from "../../components/DisplayAPlaylist/DisplayAPlaylist";
import Bar from "../../components/NavBar/Navbar";

import { Button, Form, Input } from "react-bootstrap";
const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
function Playlist() {
  const currentUser = AuthService.getCurrentUser();
  const [values, setValues] = useState({
    name: "",
    desc: "",
    img: "",
  });
  const [submitted, setSubmitted] = useState(true);
  const [valid, setValid] = useState(false);
  const [playlist, setPlaylist] = useState();

  const handleNameInputChange = (event) => {
    setValues({ ...values, name: event.target.value });
  };

  const handledescInputChange = (event) => {
    setValues({ ...values, desc: event.target.value });
  };

  const handleimgInputChange = (event) => {
    setValues({ ...values, img: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (values.name && values.desc && values.img) {
      setValid(true);

      axios
        .post(URL + "playlist", values, {
          headers: { authorization: currentUser.token },
        })
        .then((res) => {
          console.log(res.data.data);
          setPlaylist(res.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <>
      <Bar />
      <div className="form-container">
        {valid ? (
          <DisplayAPlaylist playlist={playlist} />
        ) : (
          <form className="formDiv" onSubmit={handleSubmit}>
            <h1 className="h1Div"> New PlayList</h1>

            <input
              className="inputDiv"
              onChange={handleNameInputChange}
              value={values.name}
              placeholder="Name"
              name="name"
            />

            <input
              className="inputDiv"
              onChange={handledescInputChange}
              value={values.desc}
              placeholder="Description"
              name="desc"
            />

            <input
              className="inputDiv"
              onChange={handleimgInputChange}
              value={values.img}
              placeholder="Image"
              name="Image"
            />

            <button className="btnDiv" type="submit">
              New Playlist
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Playlist;

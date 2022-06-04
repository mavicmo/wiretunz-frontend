import React, { useState } from "react";
import "./Playlist.css";
import axios from "axios";
import AuthService from "../../services/authServices";
import DisplayAPlaylist from "../../components/DisplayAPlaylist/DisplayAPlaylist";


import { Button, Form, Input } from "react-bootstrap";

function Playlist() {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser.token);
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
        .post("http://localhost:3001/playlist", values, {
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

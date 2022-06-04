import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Bar from "../../components/NavBar/Navbar";
import AuthService from "../../services/authServices";
function UpdatePlaylist(props) {
  const playlistID = useParams();
  const currentUser = AuthService.getCurrentUser();
  const id = playlistID.playlistid;
  console.log(id);

  const [values, setValues] = useState({
    name: "",
    desc: "",
    img: "",
  });

  // setting the values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handles the submit button for a sign up
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    // updatePlaylist(playlistID);
    console.log("update playlist hit");

    axios
      .put("http://localhost:3001/playlist/editplaylist/" + `${id}`, values, {
        headers: { authorization: currentUser.token },
      })
      .then((res) => {
        console.log(res);
        setValues(res.data.data);
      });
  };

  return (
    <>
      <Bar />
      <form className="update" onSubmit={handleSubmit}>
        <h1 className="h1Div"> Edit The Playlist</h1>

        <input
          className="inputDiv"
          onChange={onChange}
          value={values.name}
          placeholder="Name"
          name="name"
        />

        <input
          className="inputDiv"
          onChange={onChange}
          value={values.desc}
          placeholder="Desc"
          name="desc"
        />

        <input
          className="inputDiv"
          onChange={onChange}
          value={values.img}
          placeholder="Image"
          name="img"
        />

        <button type="submit" className="btnDiv">
          Submit
        </button>
      </form>
    </>
  );
}

export default UpdatePlaylist;

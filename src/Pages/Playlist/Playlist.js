import React, { useState } from "react";
import "./Playlist.css";
import axios from "axios";
import NavBar from "../../components/NavBar/Navbar";
import AuthService from "../../services/authServices";
import DisplayAPlaylist from "../../components/DisplayAPlaylist/DisplayAPlaylist";
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
    <div className="form-container">
      {valid ? (
        <DisplayAPlaylist playlist={playlist} />
      ) : (
        <form className="New Playlist" onSubmit={handleSubmit}>
          <h1> New Playlist</h1>

          <input
            onChange={handleNameInputChange}
            value={values.name}
            className="form-field"
            placeholder="Name"
            name="name"
          />

          <input
            onChange={handledescInputChange}
            value={values.desc}
            className="form-field"
            placeholder="desc"
            name="desc"
          />

          <input
            onChange={handleimgInputChange}
            value={values.img}
            className="form-field"
            placeholder="img"
            name="img"
          />

          <button className="form-field" type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Playlist;

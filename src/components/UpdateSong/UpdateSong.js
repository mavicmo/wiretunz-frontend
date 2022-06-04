import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Bar from "../NavBar/Navbar";
function UpdateSong(props) {
  const songID = useParams();
  const id = songID.songid;

  const [values, setValues] = useState({
    name: "",
    artist: "",
    song: "",
    img: "",
  });

  // setting the values
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // handles the submit button for a sign up
  const handleSubmit = (e, songID) => {
    e.preventDefault();
    console.log(values);

    // updateSong(songID);
    console.log("update song hit");
    try {
      axios
        .put("http://localhost:3001/songs/" + `${id}`, values)
        .then((res) => {
          console.log(res);
          setValues(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const updateSong = (songID) => {
    console.log("update song hit");
    try {
      axios
        .put("http://localhost:3001/songs/" + `${songID}`, values)
        .then((res) => {
          console.log(res);
          setValues(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Bar />
      <div className="song-div">
        <form className="update" onSubmit={handleSubmit}>
          <h1 className="h1Div"> Edit The Song</h1>

          <input
            className="inputDiv song-update"
            onChange={onChange}
            value={values.name}
            placeholder="Name"
            name="name"
          />
          <br></br>
          <input
            className="inputDiv song-update"
            onChange={onChange}
            value={values.artist}
            placeholder="Artist"
            name="artist"
          />
          <br></br>
          <input
            className="inputDiv song-update"
            onChange={onChange}
            value={values.song}
            placeholder="Song"
            name="song"
          />

          <br></br>
          <input
            className="inputDiv song-update"
            onChange={onChange}
            value={values.img}
            placeholder="img"
            name="img"
          />

          <button type="submit" className="btnDiv">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateSong;

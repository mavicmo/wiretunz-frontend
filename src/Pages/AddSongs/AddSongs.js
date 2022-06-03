import React, { useState } from "react";
import "./AddSongs.css";
import axios from "axios";
import NavBar from "../../components/NavBar/Navbar";


function AddSong() {
  const [equals, setEquals] = useState({
    name: "",
    artist: "",
    song: "",
    img: "",
  });
  const [submitted, setSubmitted] = useState(true);
  const [valid, setValid] = useState(false);

  const handleTitleInputChange = (event) => {
    setEquals({ ...equals, name: event.target.value });
  };

  const handleArtistInputChange = (event) => {
    setEquals({ ...equals, artist: event.target.value });
  };

  const handleSongInputChange = (event) => {
    setEquals({ ...equals, song: event.target.value });
  };

  const handleImgInputChange = (event) => {
    setEquals({ ...equals, img: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (equals.name && equals.artist && equals.song && equals.img) {
      setValid(true);

      axios
        .post("http://localhost:3001/songs/", equals)
        .then(() => console.log("uploaded"));
    }
    setSubmitted(true);
  };
  return (
    <>
      <NavBar />
      <div className="form-container">
        <form className="formDiv" onSubmit={handleSubmit}>
          <h1 className="h1Div"> Add New Song</h1>

          {submitted && valid ? (
            <div className="Your Song Has Been Added!"></div>
          ) : null}

          <input
            className="inputDiv"
            onChange={handleTitleInputChange}
            value={equals.name}
            placeholder="Name"
            name="title"
          />

          <input
            className="inputDiv"
            onChange={handleArtistInputChange}
            value={equals.artist}
            placeholder="Artist"
            name="artist"
          />

          <input
            className="inputDiv"
            onChange={handleSongInputChange}
            value={equals.song}
            placeholder="Song"
            name=""
          />

          <input
            className="inputDiv"
            onChange={handleImgInputChange}
            value={equals.img}
            placeholder="img"
            name=""
          />

          {/* {submitted && !equals.email ?<span>Enter Email Name</span> :null} */}
          <button className="btnDiv" type="submit">
            Add Song
          </button>
        </form>
      </div>
    </>
  );
}

export default AddSong;

import React, { useState } from "react";
import "./AddSong.css";
import axios from "axios";
// import NavBar from "../../components/NavBar/Navbar";
import { Link } from "react-router-dom";
import DisplayASong from "../../components/DisplayASong/DisplayASong";
import Bar from "../../components/NavBar/Navbar";

function AddSong() {
  const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
  const [songs, setSongs] = useState();

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

      axios.post(URL + "songs/", equals).then((res) => {
        setSongs(res.data.music);
        console.log(res.data.music);
      });
    }
    setSubmitted(true);
  };

  return (
    <>
      <Bar />
      <div className="form-container">
        {valid ? (
          <div>
            <DisplayASong song={songs} />
          </div>
        ) : (
          <form className="formDiv" onSubmit={handleSubmit}>
            <h1 className="h1Div"> Add New Song</h1>

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

            <button className="btnDiv" type="submit">
              Add Song
            </button>
          </form>
        )}
      </div>
    </>
  );
}
export default AddSong;

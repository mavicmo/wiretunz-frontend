import { useState, useEffect } from "react";
import axios from "axios";
export default function TrackSearchResult({ track, chooseTrack }) {
  console.log(track);
  const URL = "http://localhost:3001/songs/";
  const song = {
    name: track.title,
    artist: track.artist,
    img: track.albumUrl,
  };
  function handlePlay() {
    chooseTrack(track);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/songs/", song).then((res) => {
      console.log(res.data.music);
    });
  };

  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: "64px", width: "64px" }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="text-muted">{track.artist}</div>
        <button onClick={handleSubmit}>Add Song</button>
      </div>
    </div>
  );
}

import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function UpdateSong(props) {
  console.log(props);
  const updateSong = (songID) => {
    const data = {
      songID,
    };
    axios.put(URL + `${songID}`);
  };
  return (
    <>
      <h1>h1</h1>
    </>
  );
}

export default UpdateSong;

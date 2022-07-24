import { useState } from "react";
import "./DisplayAPlaylist.css";
import { Button, Fade, Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/authServices";
function DisplayAPlaylist({ playlist }) {
  const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
  const playlistID = useParams();
  const currentUser = AuthService.getCurrentUser();
  const id = playlistID.playlistid;

  const [values, setValues] = useState();
  const loaded = () => {
    {
      console.log("loading hit");
    }

    const getPlaylist = () => {
      console.log("got the playlist");

      axios
        .put(URL + `{id}`, {
          headers: { authorization: currentUser.token },
        })
        .then((res) => {
          console.log(res);
        });
    };

    return (
      <Container>
        <div className="containerDiv">
          <h1 className="h1Div">Added Playlist!</h1>
          <h2>
            Name:{" "}
            {playlist.name.charAt(0).toUpperCase() + playlist.name.slice(1)}
          </h2>
          <h2>
            desc:{" "}
            {playlist.desc.charAt(0).toUpperCase() + playlist.desc.slice(1)}
          </h2>

          <h2>
            Image:{" "}
            {playlist.img.charAt(0).toUpperCase() + playlist.img.slice(1)}
          </h2>
        </div>
      </Container>
    );
  };

  const loading = () => {
    console.log("loading hit");
    return <h1>Loading...</h1>;
  };

  return playlist ? loaded() : loading();
}

export default DisplayAPlaylist;

import { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/authServices";
function ViewPlaylist() {
  const URL = "https://wiretunzserver.herokuapp.com/";
  const playlistID = useParams();
  const currentUser = AuthService.getCurrentUser();
  const id = playlistID.playlistid;

  const [values, setValues] = useState("");
  const [songs, setSongs] = useState("");
  const [valid, setValid] = useState(false);
  //   console.log(songs);
  useEffect(() => {
    console.log("hit");
    getPlaylist();
    if (!values) return console.log("error");
    // getSongs(values.songs);
  }, []);

  const getPlaylist = () => {
    console.log("got the playlist");

    axios
      .get(URL + `playlist/${id}`, {
        headers: { authorization: currentUser.token },
      })
      .then((res) => {
        console.log(res.data.data);
        setValues(res.data.data.playlist);
        setSongs(res.data.data.songs);
        setValid(true);
      });
  };

  //   const getSongs = (songs) => {
  //     console.log(songs);
  //     songs.map((song) => {
  //       axios
  //         .get(`http://localhost:3001/songs/${song}`, {
  //           headers: { authorization: currentUser.token },
  //         })
  //         .then((res) => {
  //           console.log(res.data.data.song);
  //           setSongs(...songs, res.data.data.song);
  //         });
  //     });
  //   };

  const removeSong = (songID, playlistID) => {
    const data = {
      songID,
      playlistID,
    };

    axios
      .put(URL + "playlist/removesong/", data, {
        headers: { authorization: currentUser.token },
      })
      .then(() => {
        console.log("removed");
        window.location.reload(false);
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="containerDiv">
          <h1 className="h1Div">{values.name}</h1>

          {valid
            ? songs.map((song) => (
                <div style={{ overflowY: "auto" }}>
                  <h2>
                    desc:{" "}
                    {values.desc.charAt(0).toUpperCase() + values.desc.slice(1)}
                  </h2>
                  <h2>{song.name}</h2>
                  <img
                    src={song.img}
                    style={{ height: "64px", width: "64px" }}
                    alt={song.name}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      removeSong(song._id, values._id);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))
            : null}
        </div>
      </Container>
    </>
  );
}

export default ViewPlaylist;

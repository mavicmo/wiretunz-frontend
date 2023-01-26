import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/authServices";
import * as AiIcons from "react-icons/ai";

// import UpdateSong from "./components/UpdateSong/UpdateSong";
import { DropdownButton, Dropdown, Card } from "react-bootstrap";

function Songs() {
  const [songs, setSongs] = useState([]);

  const [playlists, setPlaylists] = useState();
  const currentUser = AuthService.getCurrentUser();
  // const playlist = FetchPlaylist.fetchPlaylistData();

  const URL = "https://wiretunz-production.up.railway.app/"; //  LINK

  useEffect(() => {
    fetchSongData();
  }, []);

  // fetch playlist information
  const fetchPlaylistData = () => {
    // fetching all playlist from our  URL
    axios.get(URL + "playlist/").then((response) => {
      // console.log(response.data.data);
      setPlaylists(response.data.data);
    });
  };

  useEffect(() => {
    fetchPlaylistData();
  }, []);
  const fetchSongData = () => {
    // fetching all songs from our  URL
    axios.get(URL + "songs/").then((response) => {
      // console.log(response.data.data);
      setSongs(response.data.data);
    });
  };

  if (!songs.length || !playlists.length) {
    return <h1>loading....</h1>;
  }

  const likedSong = (id) => {
    console.log("liked hit");
    axios.put(URL + `likedsong/${id}`, null, {
      headers: { authorization: currentUser.token },
    });
  };

  const deleteSong = (id) => {
    console.log("deleted");
    axios
      .delete(URL + `songs/${id}`, {
        headers: { authorization: currentUser.token },
      })
      .then(window.location.reload());
  };

  const addToPlaylist = (songID, playlistID) => {
    console.log(songID, playlistID);
    const data = {
      songID,
      playlistID,
    };
    axios
      .put(URL + "playlist/addsong/", data, {
        headers: { authorization: currentUser.token },
      })
      .then(() => console.log("song added"));
  };

  return (
    <>
      {/* <Bar /> */}

      <section className="row">
        {songs.map((song) => (
          <Card
            key={song._id}
            style={{ width: "14rem" }}
            className="col-md-4 song-card"
          >
            <Card.Img variant="top" className="cardImg inner" src={song.img} />
            <Card.Body>
              <Card.Title>{song.name}</Card.Title>
              <Card.Text>{song.artist}</Card.Text>

              <button
                onClick={() => {
                  likedSong(song._id);
                }}
              >
                <AiIcons.AiFillHeart />
              </button>

              <Link to={`/updatesong/${song._id}`}>
                <button className="btn btn-secondary">Update</button>
              </Link>

              <button
                onClick={() => {
                  deleteSong(song._id);
                }}
              >
                Delete
              </button>
              <DropdownButton
                key={"Warning"}
                id={`dropdown-"Warning"s-${"Warning"}`}
                variant={"Warning".toLowerCase()}
                title={"Playlist"}
              >
                {playlists.map((playlist) => (
                  <Dropdown.Item
                    eventKey={playlist._id}
                    onClick={() => {
                      addToPlaylist(song._id, playlist._id);
                    }}
                  >
                    {playlist.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Card.Body>
          </Card>
        ))}
      </section>
    </>
  );
}

export default Songs;

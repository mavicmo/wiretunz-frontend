import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Bar from "../NavBar/Navbar";
import AuthService from "../../services/authServices";

function DisplayPlaylist() {
  const [playlist, setPlaylist] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const URL = "http://localhost:3001/playlist/"; // HEROKU LINK

  useEffect(() => {
    fetchPlaylistData();
  }, []);

  const fetchPlaylistData = () => {
    // fetching all playlist from our heroku URL
    axios.get(URL).then((response) => {
      console.log(response.data.data);
      setPlaylist(response.data.data);
    });
  };

  const deletePlaylist = (id) => {
    console.log("delete hit");
    axios
      .delete(URL + `${id}`, {
        headers: { authorization: currentUser.token },
      })
      .then(window.location.reload());
  };

  if (!playlist.length) {
    return <h1>loading....</h1>;
  }

  // console.log(playlist);
  return (
    <>
      <Bar />
      <section className="container-fluid search-result row play-list">
        {playlist.map((Playlist) => (
          <div key={Playlist._id} className="Playlist">
            <Link to={`/${Playlist._id}`}>
              <h1>{Playlist.name}</h1>
              <img src={Playlist.image} alt={Playlist.name} />
              <h3>{Playlist.desc}</h3>
            </Link>
            <Link to={`/updateplaylist/${Playlist._id}`}>
              <button className="btn btn-secondary">Update</button>
            </Link>
            <button
              onClick={() => {
                deletePlaylist(Playlist._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default DisplayPlaylist;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DisplayPlaylist() {
  const [playlist, setPlaylist] = useState([]);

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

  if (!playlist.length) {
    return <h1>loading....</h1>;
  }

  // console.log(playlist);
  return (
    <section>
      <div>Hello playlist</div>
      {playlist.map((Playlist) => (
        <div key={Playlist._id} className="Playlist">
          <Link to={`/${Playlist._id}`}>
            <h1>{Playlist.name}</h1>
            <img src={Playlist.image} alt={Playlist.name} />
            <h3>{Playlist.desc}</h3>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default DisplayPlaylist;

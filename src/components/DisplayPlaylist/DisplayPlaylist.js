import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Bar from "../NavBar/Navbar";
import AuthService from "../../services/authServices";
import { Button, Fade, Container, Card } from "react-bootstrap";
import "./DisplayPlaylist.css";
import ViewPlaylist from "../../Pages/ViewPlaylist/ViewPlaylist";
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
      <Container className="d-flex flex-column py-2">
        <div className="btnplaylist">
          <Link to="/addplaylist">
            <Button variant="secondary" size="lg" className="createPlaylist">
              Create Playlist
            </Button>
          </Link>
        </div>
      </Container>
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <div
          className="container-fluid search-result row play-list"
          style={{ overflowY: "auto" }}
        >
          {playlist.map((Playlist) => (
            <Card>
              <Card.Body>
                <div key={Playlist._id} className="Playlist">
                  <Container>
                    <Link
                      to={`/${Playlist._id}`}
                      style={{ textDecoration: "none", color: "blue" }}
                    >
                      <h1 className="playlistName">{Playlist.name}</h1>
                    </Link>

                    <p className="playlistDesc">{Playlist.desc}</p>
                  </Container>
                  <div className="buttons">
                    <Link to={`/ViewPlaylist/${Playlist._id}`}>
                      <button type="button" className="btn btn-primary btn-sm">
                        View
                      </button>
                    </Link>
                    <Link to={`/updateplaylist/${Playlist._id}`}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        deletePlaylist(Playlist._id);
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default DisplayPlaylist;

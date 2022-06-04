import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import AuthService from "../../services/authServices";
import Bar from "../../components/NavBar/Navbar";

function LikedSongs() {
  const [likeSong, setLikedSong] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const URL = "http://localhost:3001/songs/likedsongs/";
  console.log(currentUser);
  useEffect(() => {
    fetchLikedData();
  }, []);

  const fetchLikedData = () => {
    axios
      .get(URL, {
        headers: { authorization: currentUser.token },
      })
      .then((res) => {
        console.log(res.data.data);
        setLikedSong(res.data.data);
      });
  };

  const deleteSong = (id) => {
    console.log("deleted");
    axios
      .delete(URL + `${id}`, {
        headers: { authorization: currentUser.token },
      })
      // .then(window.location.reload(false));
  };

  if (!likeSong.length) {
    return <h1>loading....</h1>;
  }

  return (
    <>
      <Bar />
      <main className="main-content">
        <dev className="container-fluid search-result row">
          {likeSong.map((like) => (
            <Card
              key={like._id}
              style={{ width: "25rem" }}
              className="col-md-4 border"
            >
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{like.name}</Card.Title>
                <Card.Text>{like.artist}</Card.Text>
                <Button variant="primary">Go somewhere</Button>

                <Button
                  onClick={() => {
                    deleteSong(like._id);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </dev>
      </main>
    </>
  );
}

export default LikedSongs;

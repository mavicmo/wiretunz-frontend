import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import AuthService from "../../services/authServices";
import Bar from "../../components/NavBar/Navbar";
import * as AiIcons from "react-icons/ai";

function LikedSongs() {
  const [likeSong, setLikedSong] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const URL = "https://wiretunz-production.up.railway.app/";
  console.log(currentUser);
  useEffect(() => {
    fetchLikedData();
  }, []);

  const fetchLikedData = () => {
    axios
      .get(URL + "songs/likedsongs/", {
        headers: { authorization: currentUser.token },
      })
      .then((res) => {
        console.log(res.data.data);
        setLikedSong(res.data.data);
      });
  };

  const likedSong = (id) => {
    console.log("liked hit");
    axios
      .put(URL + "songs/likedsong/" + `${id}`, null, {
        headers: { authorization: currentUser.token },
      })
      .then(window.location.reload());
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
              <Card.Img variant="top" src={like.img} />
              <Card.Body>
                <Card.Title>{like.name}</Card.Title>
                <Card.Text>{like.artist}</Card.Text>

                <Button
                  onClick={() => {
                    likedSong(like._id);
                  }}
                >
                  <AiIcons.AiFillHeart />
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

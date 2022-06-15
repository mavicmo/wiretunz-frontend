import { React, useState, useEffect, useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Buffer } from "buffer";
//import bootstrap
import { Container, Form } from "react-bootstrap";
//import other components or pages
import Navbar from "../../components/NavBar/Navbar";
import Player from "../../components/Player";
import TrackSearchResult from "../../components/TrackSearchResult";
const spotifyApi = new SpotifyWebApi({
  clientId: "1d7ae6fb9e7947a8bc49ca82b84069a1",
});
const client_id = "1d7ae6fb9e7947a8bc49ca82b84069a1";
const client_secret = "0f7cdc8801454a29878f54b5a5f1e330";

function Search() {
  //useState
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [token, setToken] = useState("");
  const [genres, setGenres] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }
  // console.log(searchResults);
  //getting information from spotify api
  const fetchData = useCallback(async () => {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization:
            "Basic " +
            new Buffer.from(client_id + ":" + client_secret).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    setToken(res.data.access_token);
    getGenreCards(res.data.access_token);
  });
  const getGenreCards = async (token) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGenres(data.genres);
    // console.log(data.genres);
  };

  useEffect(() => {
    fetchData();
    spotifyApi.setAccessToken(token);
  }, []);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!token) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );
          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, token]);

  return (
    <>
      <Navbar />
      <Container
        className="d-flex flex-column py-2"
        style={{ height: "100vh" }}
      >
        <Form.Control
          type="search"
          placeholder="Search Songs/Artists"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
          {searchResults.map((track) => (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          ))}
        </div>
        <div>
          <Player token={token} trackUri={playingTrack?.uri} />
        </div>
      </Container>
    </>
  );
}

export default Search;

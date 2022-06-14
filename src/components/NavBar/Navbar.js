import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import "./Navbar.css";
import { useHistory } from "react-router-dom";
// import * as AiIcons from "react-icons/ai";
// import * as FiIcons from "react-icons/fi";
// import * as MdIcons from "react-icons/md";
// import * as CgIcons from "react-icons/cg";
// import { IconContext } from "react-icons";
// import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
// import Header from "../Header";
import WelcomePage from "../WelcomePage/WelcomePage";

const Bar = () => {
  const client_id = "1d7ae6fb9e7947a8bc49ca82b84069a1";
  const client_secret = "0f7cdc8801454a29878f54b5a5f1e330";
  //set useState
  const [artists, setArtists] = useState([]);
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [genres, setGenres] = useState([]);

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
  }, []);
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
    console.log(data.genres);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //search function
  const searchSpotify = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    console.log("hit");
    const searchArtists = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: searchKey,
          type: "artist",
        },
      });
      setArtists(data.artists.items);
      console.log(data.artists.items);
    };
    searchArtists();
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  console.log(artists);
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          bg="dark"
          expand={expand}
          className="mb-3"
          variant="dark"
        >
          <Container fluid>
            <Navbar.Brand className="brandName" href="/home">
              WireTunz
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  WireTunz
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/likedsongs">Liked</Nav.Link>
                  <Nav.Link href="/playlists">Playlist</Nav.Link>
                  <Nav.Link href="/search">Search</Nav.Link>
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href="/"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {/* <Form className="d-flex" onSubmit={searchSpotify}>
                  <FormControl
                    type="search"
                    placeholder="Enter Artist Name"
                    className="me-2 searchbar"
                    aria-label="Search"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <Button variant="secondary" onClick={searchSpotify}>
                    Search
                  </Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <WelcomePage />
    </>
  );
};

export default Bar;

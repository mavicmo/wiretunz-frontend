import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Login from "./Pages/Login/Login.js";
import SignUp from "./Pages/SignUp/SignUp.js";
import Songs from "./components/Songs/Songs.js";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import AddSong from "./Pages/AddSong/AddSong";
import Playlist from "./Pages/Playlist/Playlist";
import DisplayPlaylist from "./components/DisplayPlaylist/DisplayPlaylist";
import { Routes, Route } from "react-router-dom";
import Bar from "./components/NavBar/Navbar.js";
import LikedSongs from "./Pages/LikedSongs/LikedSongs.js";
import UpdateSong from "./components/UpdateSong/UpdateSong";
import UpdatePlaylist from "./Pages/UpdatePlaylist/UpdatePlaylist";
import Search from "./Pages/Search/Search";

//import css
import "./Styles/app.css";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addSongs/" element={<AddSong />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/addplaylist/" element={<Playlist />} />
      <Route path="/playlists/" element={<DisplayPlaylist />} />
      <Route path="/likedsongs/" element={<LikedSongs />} />
      <Route path="/updatesong/:songid" element={<UpdateSong />} />
      <Route path="/updateplaylist/:playlistid" element={<UpdatePlaylist />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;

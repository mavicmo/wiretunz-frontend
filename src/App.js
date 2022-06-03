import React from "react";

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
    </Routes>
  );
}

export default App;

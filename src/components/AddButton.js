import React from "react";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import { Link } from "react-router-dom";
import AuthService from "../services/authServices";

function WelcomePage() {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      <div className="welcome">
        <h1 className="name">
          Welcome{" "}
          {currentUser.firstName.charAt(0).toUpperCase() +
            currentUser.firstName.slice(1)}
        </h1>
      </div>
      <div className="buttons">
        <Link to="/addSongs">
          <button className="home-button">
            <FiIcons.FiMusic /> Add Song
          </button>
        </Link>
        <Link to="/addplaylist">
          <button className="home-button">
            <MdIcons.MdOutlinePlaylistAdd /> Add Playlist
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;

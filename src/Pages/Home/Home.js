import React from "react";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import Bar from "../../components/NavBar/Navbar";
import AuthService from "../../services/authServices";
import "./Home.css";
import Header from "../../components/Header";
import "../../Styles/app.css";

function Home({ data }) {
  const currentUser = AuthService.getCurrentUser();
  console.log(data);
  return (
    <>
      <Bar />
      <main className="main-content">
        <div className="search">
          <input type="text" placeholder="Search Song" id="search" />
        </div>

        <div className="welcome">
          <h1>
            Welcome
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
          <Link to="/playlist">
            <button className="home-button">
              <MdIcons.MdOutlinePlaylistAdd /> Add Playlist
            </button>
          </Link>
        </div>

        <div className="search-result">


          
        </div>
      </main>
    </>
  );
}

export default Home;

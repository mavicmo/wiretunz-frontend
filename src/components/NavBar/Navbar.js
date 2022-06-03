import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const Bar = () => {
  const SideBarInfo = [
    {
      title: "Home",
      path: "/home",
      icon: <AiIcons.AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <CgIcons.CgProfile />,
      cName: "nav-text",
    },
    {
      title: "Liked Songs",
      path: "/likedsongs",
      icon: <FiIcons.FiMusic />,
      cName: "nav-text",
    },
    {
      title: "Playlist",
      path: "/playlist",
      icon: <MdIcons.MdFeaturedPlayList />,
      cName: "nav-text",
    },
    {
      title: "Logout",
      path: "/",
      icon: <MdIcons.MdLogout />,
      cName: "nav-text",
    },
  ];

  return (
    // <div className="sidebar ">
    //   <IconContext.Provider value={{ color: "ff871f" }}>
    //     <nav className="sidebar-menu">
    //       <ul className="nav-menu-items">
    //         {SideBarInfo.map((item, index) => (
    //           <li key={index} className={item.cName}>
    //             <Link to={item.path}>
    //               {item.icon}
    //               <span>{item.title}</span>
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>
    //   </IconContext.Provider>
    // </div>

    <Navbar className="text-warning" bg="black" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          WireTunez
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/profile">
              <CgIcons.CgProfile />
            </Nav.Link>
            <Nav.Link as={Link} to="/likedsongs">
              <FiIcons.FiMusic />
            </Nav.Link>
            <Nav.Link as={Link} to="/playlist">
              <MdIcons.MdFeaturedPlayList />
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <MdIcons.MdLogout />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Bar;

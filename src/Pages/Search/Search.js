import { React, useState } from "react";
//import bootstrap
import { Container, Form } from "react-bootstrap";
//import other components or pages
import Navbar from "../../components/NavBar/Navbar";

function Search() {
  //useState
  const [search, setSearch] = useState("");
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
          {/* {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))} */}
          Songs
        </div>
        <div>bottom</div>
      </Container>
    </>
  );
}

export default Search;

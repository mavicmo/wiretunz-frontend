import { useState } from "react";
import { Link } from "react-router-dom";


function Songs() {
  console.log("songs page got hit");
  // state to hold form data
  const [newForm, setNewForm] = useState({
    name: "",
    artist: "",
    song: "",
    image: "",
  });

  const [song, setSong] = useState(null);

  const URL = "http://localhost:3001/songs/"; // HEROKU LINK

  const getSong = () => {
    // fetching all people from our heroku URL
    fetch(URL)
      .then((response) => {
        response.json();
      })
      .then((result) => setSong(result));
  };

  const createSong = async (person) => {
    // make post request to create SONG
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // I also want to update it here
    getSong();
  };
  // handle change function for form
  const handleChange = (event) => {
    console.log(event.target.value);
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createSong(newForm);
    setNewForm({
      name: "",
      artist: "",
      song: "",
      image: "",
    });
  };


  const loaded = () => {
    return song.map((song) => (
      <div key={song._id} className="song">
        <Link to={`/${song._id}`}>
          <h1>{song.name}</h1>
          <img src={song.image} alt={song.name} />
          <h3>{song.name}</h3>
        </Link>
        <Link to={`/${song._id}`}>Delete This</Link>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading.........</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="song"
          placeholder="song URL"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.title}
          name="artist"
          placeholder="artist"
          onChange={handleChange}
        />
        <input type="submit" value="New Song Added!" />
      </form>
      {song ? loaded() : loading()}
    </section>
  );
}

export default Songs;

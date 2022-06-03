import "./DisplayASong.css";

function DisplayASong({ song }) {
  const loaded = () => {
    {
      console.log("loading hit");
    }

    return (
      <div className="containerDiv">
        <h1 className="h1Div">Added Song!</h1>
        <h2>Name: {song.name.charAt(0).toUpperCase() + song.name.slice(1)}</h2>
        <h2>
          Artist: {song.artist.charAt(0).toUpperCase() + song.artist.slice(1)}
        </h2>
        <h2>Song: {song.song.charAt(0).toUpperCase() + song.song.slice(1)}</h2>
        <h2>Image: {song.img.charAt(0).toUpperCase() + song.img.slice(1)}</h2>
      </div>
    );
  };

  const loading = () => {
    console.log("loading hit");
    return <h1>Loading...</h1>;
  };

  return song ? loaded() : loading();
}

export default DisplayASong;

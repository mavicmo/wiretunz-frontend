import "./DisplayAPlaylist.css";

function DisplayAPlaylist({ playlist }) {
  const loaded = () => {
    {
      console.log("loading hit");
    }

    return (
      <div className="containerDiv">
        <h1 className="h1Div">Added Playlist!</h1>
        <h2>
          Name: {playlist.name.charAt(0).toUpperCase() + playlist.name.slice(1)}
        </h2>
        <h2>
          desc: {playlist.desc.charAt(0).toUpperCase() + playlist.desc.slice(1)}
        </h2>

        <h2>
          Image: {playlist.img.charAt(0).toUpperCase() + playlist.img.slice(1)}
        </h2>
      </div>
    );
  };

  const loading = () => {
    console.log("loading hit");
    return <h1>Loading...</h1>;
  };

  return playlist ? loaded() : loading();
}

export default DisplayAPlaylist;

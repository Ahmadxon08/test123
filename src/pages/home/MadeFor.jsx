import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MadeFor = () => {
  const [playlists, setPlaylists] = useState([]);

  const fetchHomePlaylists = async () => {
    try {
      const limit = 4;
      const offset = 0;
      const accessToken = localStorage.getItem("access_token");
      const res = await fetch(
        `https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists?=limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("There was an error fetching in the HomePlay pages!!!");
      }
      const data = await res.json();
      setPlaylists(data.playlists.items);
    } catch (error) {
      console.log("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchHomePlaylists();
  }, []);

  console.log(playlists);

  return (
    <>
      {" "}
      <div className="headForTop">
        <h1>Made for you</h1>
        <Link to={"/playList"}>SEE ALL</Link>
      </div>
      <div className="play_body">
        {playlists.map((playlist, index) => (
          <div className="play_home" key={index}>
            <img src={playlist.images[0].url} alt={playlist.name} />

            <h3>{playlist.name}</h3>
            <p>{playlist.owner.display_name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MadeFor;

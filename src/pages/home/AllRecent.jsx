import { useEffect, useState } from "react";

const AllRecent = () => {
  const [playlists, setPlaylists] = useState([]);

  const fetchHomePlaylists = async () => {
    try {
   
      const accessToken = localStorage.getItem("access_token");
      const res = await fetch(
        `https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists`,
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
      <div className="headFor">
        <h1>Recently played</h1>
       
      </div>
      <div className="play_body">
        {playlists.map((playlist, index) => (
          <div className="play_home" key={index}>
            <img src={playlist.images[0].url} alt={playlist.name} />

            <h3>{playlist.owner.id}</h3>
            <p>{playlist.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllRecent;

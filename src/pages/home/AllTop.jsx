import { useEffect, useState } from "react";
import Loading from "./../../components/loader/Loading";

const AllTop = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHomePlaylists = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      const limit = 8;
      const offset = 0;

      const res = await fetch(
        `https://api.spotify.com/v1/browse/categories/toplists/playlists?=limit=${limit}&offset=${offset}`,
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomePlaylists();
  }, []);

  console.log(playlists);

  return (
    <>
      {loading && <Loading />}

      <div className="headFor">
        <h1>Your top mixes</h1>
      </div>
      <div className="play_body">
        {playlists.map((playlist, index) => (
          <div className="play_home" key={index}>
            <img src={playlist.images[0].url} alt={playlist.name} />

            <h3>{playlist.name.slice(0, 8)}...</h3>
            <p>{playlist.description.slice(0, 14)}...</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllTop;

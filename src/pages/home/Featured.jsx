import { useEffect, useState } from "react";
import "./Featured.scss";
import Loading from "../../components/loader/Loading";
const FeaturedPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const limit = 6;
      const offset = 0;

      const response = await fetch(
        `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch featured playlists from Spotify API");
      }

      const data = await response.json();
      setPlaylists(data.playlists.items);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlaylists();
  }, []);
  console.log(playlists);

  return (
    <div >
      {error && <p>{error}</p>}
      {loading && <Loading />}
      {playlists && (
        <div className="featured">
          {playlists.map((playlist, index) => (
            <div className="feat" key={index}>
              <img src={playlist.images[0].url} alt="" />
              <span>{playlist.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedPlaylists;

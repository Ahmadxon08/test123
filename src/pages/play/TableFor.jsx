/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import Loading from "../../components/loader/Loading";
import { Audioprovider } from "../../context";
const heartWhite = "./assets/img/heart_white.png";
const heartGreen = "./assets/img/heart_green.png";
const angle = "./assets/img/angle.png";
const download = "./assets/img/downLoad.png";
const dots = "./assets/img/dots.png";

const TableFor = ({ addToLikedItems }) => {
  const [playlists, setPlaylists] = useState([]);
  const [likedList, setLikedList] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [music, setMusic] = useState("");
  const { audio, setAudio } = useContext(Audioprovider);
  const fetchHomePlaylists = async () => {
    setLoading(true);
    try {
      // const limit = 14;
      // const offset = 0;
      const accessToken = localStorage.getItem("access_token");
      const res = await fetch(
        `https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks`,
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
      if (data && data.items) {
        const likedListInit = {};
        data.items.forEach((playlist, index) => {
          likedListInit[index] = false;
        });
        setLikedList(likedListInit);
        setPlaylists(data.items);
      } else {
        throw new Error("Playlist items not found in the response!");
      }
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  }; ///////////////////////////////////////
  const fetchMusic = async (trackId) => {
    setLoading(false);
    try {
      const accessToken = localStorage.getItem("access_token");
      const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("There was an error fetching the music!");
      }
      const data = await res.json();
      setMusic(data.preview_url);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(true);
    }
  };
  /////////////////////////
  useEffect(() => {
    fetchMusic();
  }, []);
  const handleSearchIconClick = () => {
    setSearchTerm("");
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetchHomePlaylists();
  }, []);

  const toggleLiked = (index) => {
    setLikedList((prevLikedList) => ({
      ...prevLikedList,
      [index]: !prevLikedList[index],
    }));
    addToLikedItems(playlists[index]);
  };

  console.log(playlists);
  const formatDuration = (duration_ms) => {
    const seconds = Math.floor((duration_ms / 1000) % 60);
    const minutes = Math.floor((duration_ms / (1000 * 60)) % 60);

    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;

    return minutesStr + ":" + secondsStr;
  };
  console.log(music);

  const fetchMusicOblject = (music) => {
    localStorage.setItem("music", JSON.stringify(music));
    setAudio(music);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="action">
        <div className="live">
          <div className="playAct">
            <img src={angle} alt="angle plays" />
          </div>

          <img
            src={heartWhite}
            alt="Like button can add this music from that page to Like page"
          />
          <div className="down">
            <img
              src={download}
              alt="Like button can add this music from that page to Like page"
            />
          </div>
          <img
            src={dots}
            alt="Like button can add this music from that page to Like page"
          />
        </div>
        <div className="search">
          <div className="searchBtn">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Search..."
            />
            <IoSearch color="white" onClick={handleSearchIconClick} size={28} />
          </div>
        </div>
      </div>
      <div className="headFortable">
        <div className="id">
          <span>#</span>
          <p>TITLE</p>
        </div>
        <h1>ALBUM</h1>
        <h1>DATE ADDED</h1>
        <div className="img">
          <LuClock3 size={22} color="white" />
        </div>
      </div>
      {/* <PlayListItem /> */}
      <div className="play_list">
        {filteredPlaylists.length === 0 ? (
          <h1 className="noRes">No Results 😒😒😒</h1>
        ) : (
          filteredPlaylists.map((playlist, index) => (
            <div className="play_item" key={index}>
              <div className="id">
                <h3>{index + 1}</h3>
                {playlist.track.album.images[2] && (
                  <div
                    onClick={() => fetchMusicOblject(playlist)}
                    className="img"
                  >
                    <img
                      style={{
                        cursor: "pointer",
                      }}
                      src={playlist.track.album.images[2].url}
                      alt={playlist.track.name}
                    />
                  </div>
                )}
                <div className="nema">
                  {playlist.track.album.name.length > 8 && (
                    <h3>{playlist.track.album.name.slice(0, 8)}...</h3>
                  )}
                  {playlist.track.artists[0].name.length > 5 && (
                    <h2>{playlist.track.artists[0].name.substring(0, 9)}...</h2>
                  )}
                </div>
              </div>

              <div className="album">
                <p>{playlist.track.name}</p>
              </div>

              <div className="date">
                <p>{playlist.added_at.split("T")[0]}</p>
              </div>

              <div className="timer">
                <img
                  onClick={() => toggleLiked(index)}
                  src={likedList[index] ? heartGreen : heartWhite}
                  alt="Like button can add this music from that page to Like page"
                />
                <h1>{formatDuration(playlist.track.duration_ms)}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TableFor;

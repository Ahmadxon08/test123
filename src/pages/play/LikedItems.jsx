/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Audioprovider } from "../../context";

const LikedItems = ({ likedItems }) => {
  const { audio, setAudio } = useContext(Audioprovider);
  const [playlists, setPlaylists] = useState([]);
  const [likedList, setLikedList] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const clock = "./assets/img/Clock.png";
  const heartWhite = "./assets/img/heart_white.png";
  const heartGreen = "./assets/img/heart_green.png";
  const angle = "./assets/img/angle.png";
  const download = "./assets/img/downLoad.png";
  const dots = "./assets/img/dots.png";

  const fetchHomePlaylists = async () => {
    try {
      const limit = 14;
      const offset = 0;
      const accessToken = localStorage.getItem("access_token");
      const res = await fetch(
        `https://api.spotify.com/v1/playlists/37i9dQZF1DWWY64wDtewQt/tracks?limit=${limit}&offset=${offset}`,
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
    }
  };

  const handleSearchIconClick = () => {
    setSearchTerm("");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchHomePlaylists();
  }, []);

  const deleteLiked = (index) => {
    const updatedLikedList = { ...likedList };
    delete updatedLikedList[index];
    setLikedList(updatedLikedList);
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.track.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDuration = (duration_ms) => {
    const seconds = Math.floor((duration_ms / 1000) % 60);
    const minutes = Math.floor((duration_ms / (1000 * 60)) % 60);

    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    const secondsStr = seconds < 10 ? "0" + seconds : seconds;

    return minutesStr + ":" + secondsStr;
  };

  const fetchMusicObject = (music) => {
    localStorage.setItem("music", JSON.stringify(music));
    setAudio(music);
  };

  return (
    <>
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
        <img src={clock} alt="timer" />
      </div>
      <div className="play_list">
        {filteredPlaylists.map((item, index) => (
          <div className="play_item" key={index}>
            <div className="id">
              <h3>{index + 1}</h3>
              {item.track.album.images[2] && (
                <div onClick={() => fetchMusicObject(item)} className="img">
                  <img
                    style={{
                      cursor: "pointer",
                    }}
                    src={item.track.album.images[2].url}
                    alt={item.track.name}
                  />
                </div>
              )}
              <div className="nema">
                {item.track.album.name.length > 8 && (
                  <h3>{item.track.album.name.slice(0, 8)}...</h3>
                )}
                {item.track.artists[0].name.length > 5 && (
                  <h2>{item.track.artists[0].name.substring(0, 9)}...</h2>
                )}
              </div>
            </div>
            <div className="album">
              <p>{item.track.name}</p>
            </div>
            <div className="date">
              <p>{item.added_at.split("T")[0]}</p>
            </div>
            <div className="timer">
              <img
                onClick={() => deleteLiked(index)}
                src={ heartGreen}
                alt="Like button can add this music from that page to Like page"
              />
              <h1>{formatDuration(item.track.duration_ms)}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LikedItems;

import { useContext, useEffect, useState } from "react";
import { Audioprovider } from "../../context";
import "./Footer.scss";
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
// const audio = "./assets/audio.mp3";

const Footer = () => {
  const { audio } = useContext(Audioprovider);
  const [audios, setAudios] = useState(null);

  useEffect(() => {
    const audio = JSON.parse(localStorage.getItem("music"));
    setAudios(audio);
  }, [audio]);
  console.log(audios?.track);
  return (
    <div className="lorem">
      <img
        src={audios?.track?.album?.images[1]?.url}
        alt="this is musical picture"
      />

      <span>{audios?.track?.artists[0]?.name}</span>

      <AudioPlayer
        style={{
          width: "50%",
          height: "80px",
        }}
        src={audios?.track?.preview_url}
        
        controls
      />
    </div>
  );
};

export default Footer;

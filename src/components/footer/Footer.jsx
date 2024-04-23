import { useContext, useEffect, useState } from "react";
import { Audioprovider } from "../../context";
import "./Footer.scss";
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
      <audio className="audio" controls>
        <source src={audios?.track?.preview_url} type="audio/mp3" />
      </audio>
    </div>
  );
};
  
export default Footer;

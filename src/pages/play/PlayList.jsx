/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import "./Play.scss";
import { Link } from "react-router-dom";
// import LikedItems from "./LikedItems";
import TableFor from "./TableFor";
import { MdAccountCircle } from "react-icons/md";

const row = "./assets/img/Polygon1.png";

const PlayList = ({addToLikedItems}) => {
  // const [playlists, setPlaylists] = useState([]);
  const CLIENT_ID = "c2a9fa63b39747bd9da7a239b05d6609";
  const CLIENT_SECRET = "64ed6d5c1bc84099aa34dad4e681e7a6";
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
          },
          body: "grant_type=client_credentials",
        });

        const auth = await res.json();
        const accessToken = `${auth.token_type} ${auth.access_token}`;
        // fetchPlaylists(accessToken);
        localStorage.setItem("access_token", JSON.stringify(accessToken));
      } catch (error) {
        console.error(error);
      }
    };

    // const fetchPlaylists = async (accessToken) => {
    //   try {
    //     const res = await fetch(
    //       "https://api.spotify.com/v1/browse/categories/toplists/playlists",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       }
    //     );

    //     if (!res.ok) {
    //       throw new Error("Failed to fetch playlists");
    //     }

    //     const data = await res.json();
    //     setPlaylists(data.playlists.items);
    //   } catch (error) {
    //     console.error("Error:", error.message);
    //   }
    // };

    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // fetchPlaylists(accessToken);
    } else {
      getToken();
    }
  }, []);
  // console.log(playlists);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, []);
  return (
    
    <div className="playComponent">
      <div className="head">
        <div className="container">
        <div className="nav">
            <div className="btn">
              <Link to={"/like"} className="btn1">
                <img src={row} alt="" />
              </Link>
              <Link to={"/play"} className="btn12">
                <img src={row} alt="row is " />
              </Link>
            </div>
            <Link to={"/profile"} className="profile">
              <MdAccountCircle color="white" size={42} />
              <span>{username}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        {/* <LikedItems /> */}

        <TableFor addToLikedItems={addToLikedItems} />
      </div>
    </div>
  );
};

export default PlayList;
{
  /* {playlists.map((playlist, index) => (
          <div className="play_list" key={index}>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
          </div>
        ))} */
}

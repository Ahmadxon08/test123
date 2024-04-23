/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./Like.scss";
import LikedItems from "./LikedItems";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
const row = "./assets/img/Polygon1.png";

const Like = ({ likedItems }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, []);
  return (
    <div className="like">
      <div className="head">
        <div className="container">
          <div className="nav">
            <div className="btn">
              <Link className="btn1">
                <img src={row} alt="" />
              </Link>
              <Link to={"/"} className="btn12">
                <img src={row} alt="row is " />
              </Link>
            </div>
            <Link to={"/profile"} className="profile">
              <MdAccountCircle color="white" size={42} />
              <span>{username}</span>
            </Link>
          </div>
          <LikedItems likedItems={likedItems} />
        </div>
      </div>
    </div>
  );
};

export default Like;

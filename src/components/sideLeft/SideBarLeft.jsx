import { GoHomeFill } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { LuLibrary } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
// import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
const liked = "./assets/img/Liked.png";

import "./SideBar.scss";
import { datas } from "./db";

const SideBar = () => {
  return (
    <div className="sideLeft">
      <div className="column">
        <Link to={"/"} className="row">
          <GoHomeFill size={32} /> <span>Home</span>
        </Link>
        <Link className="row">
          <IoSearchSharp size={32} />
          <span>Search</span>
        </Link>
        <Link className="row">
          <LuLibrary size={32} />
          <span>Your Library</span>
        </Link>
      </div>
      <div className="two">
        <Link to={"/play"} className="row">
          <FiPlus
            color="black"
            style={{
              backgroundColor: "white",
            }}
            size={32}
          />{" "}
          <span>Create Playlist</span>
        </Link>
        <Link to={"/like"} className="row">
          <img src={liked} alt="" />
          <span>Liked Songs</span>
        </Link>
        <div className="line"></div>
        <div className="titles">
          {datas.map((data) => {
            return (
              <div className="title" key={data.id}>
                <span>{data.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

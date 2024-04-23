import { Link } from "react-router-dom";
import Featured from "./Featured";
import "./Home.scss";
import HomePlayList from "./HomePlayList";
import MadeFor from "./MadeFor";
import RecentFor from "./RecentFor";
import JumpFor from "./JumpFor";
import UniqueFor from "./UniqueFor";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";

const row = "./assets/img/Polygon1.png";

const Home = () => {
  const [username, setUsername] = useState("");

  const greetingTimeForUser = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    let greeting;
    if (currentHours >= 5 && currentHours < 12) {
      greeting = "Good morning";
    } else if (currentHours >= 12 && currentHours < 17) {
      greeting = "Good afternoon";
    } else if (currentHours >= 17 && currentHours < 21) {
      greeting = "Good evening";
    } else {
      greeting = "Good night";
    }
    return greeting;
  };
  const timeGreetingForUser = greetingTimeForUser();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsername(user.username);
    }
  }, []);

  return (
    <div className="home">
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
        <div className="h1">{timeGreetingForUser}</div>
        <Featured />
        <HomePlayList />
        <MadeFor />
        <RecentFor />
        <JumpFor />
        <UniqueFor />
      </div>
    </div>
  );
};

export default Home;

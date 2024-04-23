import { FaArrowLeftLong } from "react-icons/fa6";

import { Link } from "react-router-dom";
import AllJump from "./AllJump";
import './AllPlayList.scss';
import AllTop from "./AllTop";
import AllMade from "./AllMade";
import AllUnique from "./AllUnique";

const AllPlayList = () => {
  return (
    <div className="playAll">
      <div className="container">
        <div className="back">
          <Link to={"/"}>
            <FaArrowLeftLong />
            <span>Back</span>
          </Link>
        </div>
        <div className="allplayLists">
       
          <AllTop/>
          <AllMade/>
          <AllJump/>
          <AllUnique/>
        </div>
      </div>
    </div>
  );
};

export default AllPlayList;

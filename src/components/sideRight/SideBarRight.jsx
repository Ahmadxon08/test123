import { Link } from "react-router-dom";
import "./SideBarRight.scss";

const plus = "./assets/img/Union.png";
const cross = "./assets/img/x.png";
const account = "./assets/img/account.png";
const rows = "./assets/img/rows.png";

const SideBarRight = () => {
  return (
    <div className="sideright">
      <div className="div">
        <div className="top">
          <h1>Friend Activity</h1>
          <div className="icons">
            <Link>
              <img src={plus} alt="" />
            </Link>
            <Link>
              <img src={cross} alt="" />
            </Link>
          </div>
        </div>
        <h2>
          Let friends and followers on Spotify see what you’re listening to.
        </h2>
        <div className="acc">
          <div className="account">
            <span className="accImg">
              <img src={account} alt="" />
            </span>
            <span>
              <img src={rows} alt="" />
            </span>
          </div>
          <div className="account">
            <span className="accImg">
              <img src={account} alt="" />
            </span>
            <span>
              <img src={rows} alt="" />
            </span>
          </div>
          <div className="account">
            <span className="accImg">
              <img src={account} alt="" />
            </span>
            <span>
              <img src={rows} alt="" />
            </span>
          </div>
        </div>
        <h2>
          Go to Settings {">"} Social and enable “Share my listening activity on
          Spotify.’ You can turn this off at any time.
        </h2>
        <div className="contained">
          <button>SETTINGS</button>
        </div>
      </div>
    </div>
  );
};

export default SideBarRight;

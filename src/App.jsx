/* eslint-disable react-hooks/exhaustive-deps */
// import Play from "./pages/play/play";

import "./sass/Main.scss";
import SideBar from "./components/sideLeft/SideBarLeft";
import SideBarRight from "./components/sideRight/SideBarRight";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Like from "./pages/like/Like";
import Play from "./pages/play/PlayList";
import { useEffect, useState } from "react";

import AllPlayList from "./pages/home/AllPlayList";
import Footer from "./components/footer/Footer";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import NotFound from "./components/NotFound";

const App = () => {
  const [likedItems, setLikedItems] = useState([]);
  const addToLikedItems = (item) => {
    setLikedItems([...likedItems, item]);
  };
  const [islogin, setIsLogin] = useState(false);
  const navigete = useNavigate();
  const parms = window.location.href;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLogin(true);
      if (parms.includes("/login")) {
        return navigete("/");
      }
      return;
    } else {
      setIsLogin(false);
      return navigete("/login");
    }
  }, [islogin, parms]);

  return (
    
    <Provider store={store}>
      <div className="app">
        <SideBar />
        <Routes>
          <Route path="/login" element={<Login login={setIsLogin} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/like" element={<Like likedItems={likedItems} />} />
          <Route
            path="/play"
            element={<Play addToLikedItems={addToLikedItems} />}
          />
          <Route path="/playList" element={<AllPlayList />} />
        </Routes>
        <div className="right">
          <SideBarRight />
        </div>
        <div className="foot">
          <Footer />
        </div>
      </div>
    </Provider>
  );
};

export default App;

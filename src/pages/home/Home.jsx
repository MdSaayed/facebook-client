import { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import useClickOutside from "../../helpers/useClickOutside";
import LeftHome from "../../components/home/left/Left";
import RightHome from "../../components/home/right/Right";
import { useSelector } from "react-redux";
import "./style.css";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";
import SendVerification from "../../components/home/sendVerification/SendVerification";
import CreatePostPopup from "../../components/createPostPopup/CreatePostPopup";
import Posts from "../../components/posts/Posts";



const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [showPostBox, setShowPostbox] = useState(false);
  const el = useRef(null);
  useClickOutside(el, () => {
    setShowPostbox(false);
  });

  return (
    <div className="home" style={{ height: "100vh" }}>
      <Header page="home" />
      {showPostBox && <CreatePostPopup user={user} setShowPostbox={setShowPostbox} />}
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setShowPostbox={setShowPostbox} />
        <Posts user={user} />
      </div>
      <RightHome user={user} />
    </div >
  );
};

export default Home;

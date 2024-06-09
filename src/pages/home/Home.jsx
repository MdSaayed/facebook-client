import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/header/Header";
import useClickOutside from "../../helpers/useClickOutside";
import LeftHome from "../../components/home/left/Left";
import RightHome from "../../components/home/right/Right";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";
import SendVerification from "../../components/home/sendVerification/SendVerification";
import CreatePostPopup from "../../components/createPostPopup/CreatePostPopup";
import Posts from "../../components/posts/Posts";
import "./style.css";
import { HashLoader } from "react-spinners";

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [showPostBox, setShowPostbox] = useState(false);
  const [height, setHeight] = useState();
  const [loading, setLoading] = useState(true);
  const middle = useRef(null);
  const el = useRef(null);

  useClickOutside(el, () => {
    setShowPostbox(false);
  });

  useEffect(() => {
    const updateHeight = () => {
      if (middle.current) {
        setHeight(middle.current.clientHeight);
        setLoading(false);
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    if (middle.current) {
      resizeObserver.observe(middle.current);
    }

    // Initial height setting
    updateHeight();

    return () => {
      if (middle.current) {
        resizeObserver.unobserve(middle.current);
      }
    };
  }, []);

  return (
    <div className="home" style={{ height: height ? `${height + 100}px` : '100vh' }}>
      <Header page="home" />
      {showPostBox && <CreatePostPopup user={user} setShowPostbox={setShowPostbox} />}
      <LeftHome user={user} />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification user={user} />}
        <CreatePost user={user} setShowPostbox={setShowPostbox} />
        {loading ? (
          <div className="skeleton_loader">
            <HashLoader color="#1876f2" />
          </div>
        ) : (
          <Posts user={user} />
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
};

export default Home;

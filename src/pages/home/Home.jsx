import { useRef, useState } from "react";
import Header from "../../components/header/Header";
import useClickOutside from "../../helpers/useClickOutside";
import LeftHome from "../../components/home/left/Left";
import RightHome from "../../components/home/right/Right";
import { useSelector } from "react-redux";
import "./style.css";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";


const Home = () => {
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((state) => state);

  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div className="home">
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div >
      < RightHome user={user} />
    </div>
  );
};

export default Home;

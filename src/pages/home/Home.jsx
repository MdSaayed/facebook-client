import { useRef, useState } from "react";
import Header from "../../components/header/Header";
import useClickOutside from "../../helpers/useClickOutside";
import LeftHome from "./left/Left";
import RightHome from "./right/Right";
import { useSelector } from "react-redux";


const Home = () => {
  const [visible, setVisible] = useState(true);
  const { user } = useSelector((state) => state);

  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div>
      <Header />
      <LeftHome user={user} />
      < RightHome user={user} />
    </div>
  );
};

export default Home;

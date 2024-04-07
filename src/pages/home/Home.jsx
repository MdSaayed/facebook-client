import { useRef, useState } from "react";
import Header from "../../components/header/Header";
import useClickOutside from "../../helpers/useClickOutside";
import LeftHome from "./left/Left";

const Home = () => {
  const [visible, setVisible] = useState(true);
  const el = useRef(null);
  useClickOutside(el, () => {
    setVisible(false);
  });

  return (
    <div>
      <Header />
      <LeftHome />
    </div>
  );
};

export default Home;

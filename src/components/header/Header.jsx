import { Link } from "react-router-dom";
import "./Style.css";
import Logo from "../logo/Logo";
import Search from "../search/Search";
import ActiveHomeIcon from "../../../public/icons/svg/ActiveHome";
import Watch from "../../../public/icons/svg/Watch";
import Market from "../../../public/icons/svg/Market";
import Gaming from "../../../public/icons/svg/Gaming";
import FriendsIcon from "../../../public/icons/svg/FriendsIcon";
import { useSelector } from "react-redux";
import NotificationIcon from "../../../public/icons/svg/NotificationIcon";
import MenuIcon from "../../../public/icons/svg/MenuIcon";
import MessangerIcon from "../../../public/icons/svg/MessangerIcon";
import DownArrow from "../../../public/icons/svg/DownArrow";
import SearchMenu from "./SearchMenu";
import { useRef, useState } from "react";
import AllMenu from "./AllMenu";
import useClickOutside from "../../helpers/useClickOutside";
import UserMenu from "./userMenu/UserMenu";

const Header = ({ page }) => {
  const { user } = useSelector((user) => ({ ...user }));
  const color = "#0866ff";
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allMenu = useRef(null);
  const userMenu = useRef(null);



  useClickOutside(userMenu, () => {
    setShowUserMenu(false);
  });
  useClickOutside(allMenu, () => {
    setShowAllMenu(false);
  });
 

  return (
    <header>
      <div className="header_left">
        <Link to={"/"}>
          <div className="circle">
            <Logo />
          </div>
        </Link>
        <div className="search search1" onClick={() => {
          setShowSearchMenu(true);
        }}
        >
          {!showSearchMenu && <Search color={"#65676b"} />}
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input"
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} token={user?.token} />
      )}

      <div className="header_middle">
        <Link className={`middle_icon ${page === "home" ? 'active' : 'hover1'}`} to="/">
          <ActiveHomeIcon color={page === "home" ? color : "#65676b"} />
        </Link>
        <Link className="middle_icon hover1">
          <Watch color={page === "video" ? color : "#65676b"} />
          <div className="middle_notification">9+</div>
        </Link>
        <Link to="/friends" className={`middle_icon ${page === "friends" ? 'active' : 'hover1'}`}>
          <FriendsIcon color={page === "friends" ? color : "#65676b"} />
        </Link>
        <Link className="middle_icon hover1">
          <Market color={page === "market" ? color : "#65676b"} />
        </Link>
        <Link className="middle_icon hover1">
          <Gaming color={page === "game" ? color : "#65676b"} />
        </Link>
      </div>
      <div className="header_right">
        <Link to={`/profile/${user?.username}`} className={`profile_link hover1 ${page === "profile" ? "active_link" : ""}`}>
          <img src={user?.picture} alt="" />
          <span>{user?.first_name}</span>
        </Link>
        <div className={`circle_icon hover1 ${showAllMenu && "active_header"}`} ref={allMenu}>
          <div onClick={() => setShowAllMenu((prev) => !prev)}>
            <div style={{ transform: "translateY(2px)" }}>
              <MenuIcon />
            </div>
          </div>
          {showAllMenu && <AllMenu />}
        </div>
        <div className="circle_icon hover1 ">
          <MessangerIcon />
        </div>
        <div className="circle_icon hover1 ">
          <NotificationIcon />
          <div className="right_notification">5</div>
        </div>
        <div className={`circle_icon hover1 ${showUserMenu && "active_header"}`} ref={userMenu} onClick={() => setShowUserMenu((prev) => !prev)}>
          <div style={{ transform: "translateY(2px)" }}>
            <DownArrow />
          </div>
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header >
  );
};

export default Header;

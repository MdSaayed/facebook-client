import { useEffect, useRef, useState } from "react";
import ReturnIcon from "../../../public/icons/svg/ReturnIcon";
import Search from "../search/Search";
import useClickOutside from "../../helpers/useClickOutside";
import { search } from "../../functions/user";
import { Link } from "react-router-dom";

const SearchMenu = ({ color, setShowSearchMenu, token }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });
  useEffect(() => {
    input.current.focus();
  }, []);

  // search Handler
  const searchHandler = async () => {
    if (searchTerm === "") {
      setResult("");
    } else {
      const res = await search(searchTerm, token);
      setResult(res);
    }
  }
  console.log(result);

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => setShowSearchMenu(true)}
          >
            <ReturnIcon color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      <div className="search_history_header">
        <span>Recent searches</span>
        <a href="">Edit</a>
      </div>
      <div className="search_history"></div>
      <div className="searrch_results scrollbar">
        {
          result && result?.map((user) => (
            <Link to={`/profile/${user.username}`} className="search_user_item hover1">
              <img src={user?.picture} alt="" />
              <span>{user.first_name } {user.last_name }</span>
            </Link>
))
        }
      </div>
    </div>
  );
};

export default SearchMenu;

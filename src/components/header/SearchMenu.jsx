import { useEffect, useRef, useState } from "react";
import ReturnIcon from "../../../public/icons/svg/ReturnIcon";
import Search from "../search/Search";
import useClickOutside from "../../helpers/useClickOutside";
import { addToSearchHistory, getSearchHistory, search } from "../../functions/user";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";


const SearchMenu = ({ color, setShowSearchMenu, token }) => {
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const menu = useRef(null);
  const input = useRef(null);
  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
    getHistory();
  }, []);

  const getHistory = async () => {
    const res = await getSearchHistory(token);
    setSearchHistory(res);
  };

  const searchHandler = async () => {
    if (searchTerm === "") {
      setResult([]);
    } else {
      const res = await search(searchTerm, token);
      setResult(res);
    }
  };

  const addToSearchHistoryHandler = async (searchUser) => {
    await addToSearchHistory(searchUser, token);
    getHistory();
  };


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
      {result.length === 0 && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a href="">Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory.length > 0 && result.length === 0 && searchHistory.sort((a,b)=>{
          return new Date(b.createdAt) - new Date(a.createdAt);
        }).map((item) => (
          <div className="search_user_item hover1" key={item?._id}>
            <Link className="flex" to={`/profile/${item.user?.username}`} onClick={() => addToSearchHistoryHandler(item.user?._id)}>
              <img src={item.user?.picture} alt="" />
              <span>{item.user?.first_name} {item.user?.last_name}</span>
              <MdClose />
            </Link>
          </div>
        ))}
      </div>
      <div className="search_results scrollbar">
        {result.length > 0 && result.map((user) => (
          <Link to={`/profile/${user.username}`} className="search_user_item hover1" key={user?._id} onClick={() => addToSearchHistoryHandler(user?._id)}>
            <img src={user?.picture} alt="" />
            <span>{user?.first_name} {user?.last_name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchMenu;

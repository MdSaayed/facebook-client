import Search from "../search/Search";
import { menu } from "../../data/allMenu";
import AllMenuItem from "./AllMenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignsPost,
  faMapMarkerAlt, // Import other necessary icons from Font Awesome
  faUserFriends,
  faCalendarAlt,
  faBriefcase,
  faNewspaper,
  faStoreAlt,
  faBullhorn,
  faUser,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons';
const icons = [
  { icon: faSignsPost, title: "Post" },
  { icon: faMapMarkerAlt, title: "Map Marker" },
  { icon: faUserFriends, title: "User Friends" },
  { icon: faCalendarAlt, title: "Calendar" },
  { icon: faBriefcase, title: "Briefcase" },
  { icon: faNewspaper, title: "Newspaper" },
  { icon: faStoreAlt, title: "Store" },
  { icon: faBullhorn, title: "Bullhorn" },
  { icon: faUser, title: "User" },
  { icon: faClipboardList, title: "Clipboard List" }
];



const AllMenu = () => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <Search color={"#65676b"} />
            <input type="text" placeholder="Search Menu" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            {menu?.slice(0, 6).map((item, idx) => (
              <>
                <AllMenuItem
                  key={idx}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
                ;
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Entertainment</div>
            {menu?.slice(6, 9).map((item, idx) => (
              <>
                <AllMenuItem
                  key={idx}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
                ;
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {menu?.slice(9, 11).map((item, idx) => (
              <>
                <AllMenuItem
                  key={idx}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
                ;
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menu?.slice(11, 15).map((item, idx) => (
              <>
                <AllMenuItem key={idx} name={item.name} description={item.description} icon={item.icon} />
                ;
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Professional</div>
            {menu?.slice(15, 17).map((item, idx) => (
              <>
                <AllMenuItem
                  key={idx}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
                ;
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Commmunity Resources</div>
            {menu?.slice(17, 21).map((item, idx) => (
              <>
                <AllMenuItem
                  key={idx}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
                ;
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">More form Meta</div>
            {menu?.slice(21, 23).map((item, idx) => (
              <>
                <AllMenuItem
                  key={idx}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
                ;
              </>
            ))}
          </div>
        </div>
        <div className="all_right">
          <div className="all_right_header">Create</div>
          {icons.map((item, idx) => (
            <div key={`create_${idx}`} className="all_right_item hover1">
              <div className="all_right_circle">
                <FontAwesomeIcon icon={item} />
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMenu;

import Search from "../search/Search";
import { menu } from "../../data/allMenu";
import AllMenuItem from "./AllMenuItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IoIosBook } from "react-icons/io";
import { RiVideoChatFill } from "react-icons/ri";
import { TbStarOff } from "react-icons/tb";
import { IoFlagSharp } from "react-icons/io5";
import { HiSpeakerphone } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdEventNote } from "react-icons/md";
import { IoIosCart } from "react-icons/io";


import {
  faSignsPost,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons';




const icons = [
  { icon: faSignsPost, title: "Post" },
  { icon: IoIosBook, title: "Story" },
  { icon: RiVideoChatFill, title: "Reel" },
  { icon: TbStarOff, title: "Life event" },
  { icon: IoFlagSharp, title: "Page" },
  { icon: HiSpeakerphone, title: "Ad" },
  { icon: MdEventNote, title: "Event" },
  { icon: HiOutlineUserGroup, title: "Group" },
  { icon: IoIosCart, title: "Marketplace listing" },
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
              </>
            ))}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menu?.slice(11, 15).map((item, idx) => (
              <>
                <AllMenuItem key={idx} name={item.name} description={item.description} icon={item.icon} />
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
              </>
            ))}
          </div>
        </div>
        <div className="all_right">
          <div className="all_right_header">Create</div>
          {icons?.map((item, idx) => (
            <div key={idx} className="all_right_item hover1">
              <div className="all_right_circle">
                {item?.icon && typeof item?.icon === 'object' && item?.icon?.iconName ? (
                  <FontAwesomeIcon icon={item?.icon} />
                ) : (
                  <item.icon />
                )}
              </div>
              <span>{item?.title}</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AllMenu;

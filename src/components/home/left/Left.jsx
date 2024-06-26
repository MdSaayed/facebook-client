import LeftLink from "./LeftLink";
import "./style.css";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import Shortcut from "./Shortcut";


const LeftHome = ({ user }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="left_home scrollbar">
            <Link to={`/profile/${user.username}`} className="left_link hover2">
                < img src={user.picture} alt="" />
                <span>{user.first_name} {user.last_name}</span>
            </Link>
            {
                left?.slice(0, 8).map((link, idx) => (
                    <LeftLink key={idx} img={link.img} text={link.text} notification={link.notification} />
                ))
            }
            {
                !visible && (
                    <div className="left_link hover2" onClick={() => { setVisible(true) }} >
                        <div className="small_circle left_arrow">
                            <IoIosArrowDown />
                        </div>
                        <span>See more</span>
                    </div>
                )
            }
            {
                visible && (
                    <div className="more_left">
                        {left?.slice(9, left.length).map((link, idx) => (
                            <LeftLink key={idx} img={link.img} text={link.text} notification={link.notification} />
                        ))}
                        <div className="left_link hover2" onClick={() => { setVisible(false) }} >
                            <div className="small_circle left_arrow">
                                <IoIosArrowDown className="rotate_360" />
                            </div>
                            <span>Show less</span>
                        </div>
                    </div>
                )
            }
            <div className="splitter"></div>
            <div className="shortcut">
                <div className="heading">Yur Shortcuts</div>
                <div className="edit_shortcut">Edit</div>
            </div>
            <div className="shortcut_list">
                <Shortcut link={""} img={"../../images/ytb.png"} name={"My Youtube chaneel"} />
                <Shortcut link={""} img={"../../images/insta.png"} name={"My Instagram"} />
            </div>
            <div className={`fb_copyright ${visible && "relative_fb_copyright"}`}>
                <Link to={"/"} >Privacy</Link>
                <span>. </span>
                <Link to={"/"} >Terms</Link>
                <span>. </span>
                <Link to={"/"} >Advertising</Link>
                <span>. </span>
                <Link to={"/"} >Privacy</Link>
                <span>. </span>
                <Link to={"/"} >Add Choices</Link>
                <span>. </span>
                <Link to={"/"} >Cookies</Link>
                <span>. </span>
                <Link to={"/"} >More</Link>
                <span>. </span><br />
                Meta &copy; 2024
            </div>
        </div >
    );
};

export default LeftHome;

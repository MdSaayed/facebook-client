import { Link, useNavigate } from "react-router-dom";
import { TbMessageReport } from "react-icons/tb";
import { IoMdSettings, IoMdHelpCircle } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import { MdDarkMode } from "react-icons/md";
import { HiLogout } from "react-icons/hi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import SettingPrivacy from "./SettingPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";






const UserMenu = ({ user }) => {
    const [visible, setVisible] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // logout
    const logout = () => {
        Cookies.set("user", "")
        dispatch({
            type: "LOGOUT",
        })
        navigate("/login")
    }

    return (
        <div className="mmenu">
            {visible === 0 && <>
                <div >
                    <Link to={"/profile"} className="mmenu_header hover3">
                        <img src={user?.picture} alt="" />
                        <div className="mmenu_col">
                            <span> {user?.first_name} {user?.last_name} </span>
                            <span>See your profile</span>
                        </div>
                    </Link>
                    <div className="mmenu_splitter"></div>
                    <div className="mmenu_main hover3">
                        <div className="small_circle">
                            <TbMessageReport className={"reaport_filled_icon"} />
                        </div>
                        <div className="mmenu_col">
                            <div className="mmenu_span1"> Give feedback</div>
                            <div className="mmenu_span2">Help us improve facebook</div>
                        </div>
                    </div>
                    <div className="mmenu_splitter"></div>
                    <div className="mmenu_item hover3" onClick={() => { setVisible(1) }}>
                        <div className="small_circle">
                            <IoMdSettings className="settings_filled_icon" />
                        </div>
                        <span>Setting & privacy</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </div>
                    <div className="mmenu_item hover3" onClick={() => { setVisible(2) }}>
                        <div className="small_circle">
                            <IoMdHelpCircle />
                        </div>
                        <span>Help & support</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </div>
                    <div className="mmenu_item hover3" onClick={() => { setVisible(3) }}>
                        <div className="small_circle">
                            <MdDarkMode />
                        </div>
                        <span>Display & Accessibillity</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </div>
                    <div className="mmenu_item hover3" onClick={() => logout()}>
                        <div className="small_circle">
                            <HiLogout />
                        </div>
                        <span>Logout</span>
                    </div>
                </div>
            </>
            }
            {visible === 1 && <SettingPrivacy setVisible={setVisible} />}
            {visible === 2 && <HelpSupport setVisible={setVisible} />}
            {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
        </div >
    );
};

export default UserMenu;

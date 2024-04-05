import { GoArrowLeft } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { FaLock } from "react-icons/fa6";
import { BiSolidLock } from "react-icons/bi";
import { RxActivityLog } from "react-icons/rx";
import { PiNewspaperDuotone } from "react-icons/pi";
import { MdLanguage } from "react-icons/md";




const SettingPrivacy = ({ setVisible }) => {
    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="small_circle back_menu hover3" onClick={() => { setVisible(0) }}>
                    <GoArrowLeft />
                </div>
                Settings & privacy
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <IoMdSettings className="settings_filled_icon" />
                </div>
                <span>Settings</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <FaLock className="settings_filled_icon" />
                </div>
                <span>Privacy Checkup</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <BiSolidLock className="settings_filled_icon" />
                </div>
                <span>Privacy Shortcuts</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <RxActivityLog className="settings_filled_icon" />
                </div>
                <span>Activity log</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <PiNewspaperDuotone className="settings_filled_icon" />
                </div>
                <span>News Feed Prefrences</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <MdLanguage className="settings_filled_icon" />
                </div>
                <span>Language</span>
            </div>
        </div>
    );
};

export default SettingPrivacy;
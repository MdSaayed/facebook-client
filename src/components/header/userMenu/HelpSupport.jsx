import { GoArrowLeft } from "react-icons/go";
import { IoHelpCircle } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoIosInformationCircle } from "react-icons/io";



const HelpSupport = ({ setVisible }) => {
    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="small_circle back_menu" onClick={() => { setVisible(0) }}>
                    <GoArrowLeft />
                </div>
                Help & support
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <IoHelpCircle className="settings_filled_icon" />
                </div>
                <span>Help center</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <MdEmail className="settings_filled_icon" />
                </div>
                <span>Support & Inbox</span>
            </div>
            <div className="mmenu_item hover3" id="">
                <div className="small_circle">
                    <IoIosInformationCircle className="settings_filled_icon" />
                </div>
                <span>Report a Problem</span>
            </div>
        </div>
    );
};

export default HelpSupport;
import { GoArrowLeft } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { LiaCompactDiscSolid } from "react-icons/lia";
import { MdKeyboardAlt } from "react-icons/md";
import { CiDark } from "react-icons/ci";


const DisplayAccessibility = ({ setVisible }) => {
    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="small_circle back_menu hover1" onClick={() => { setVisible(0) }}>
                    <GoArrowLeft />
                </div>
                Display & Accessibility
            </div>
            <div className="mmenu_main" id="">
                <div className="small_circle">
                    <CiDark className="settings_filled_icon" style={{ width: "50px" }} />
                </div>
                <div className="mmenu_col">
                    <span className="mmenu_span1">Dark Mode</span>
                    <span className="mmenu_span2">Adjust the appearance of Facebook to reduce glare and give your eyes a break.</span>
                </div>
            </div>
            <label htmlFor="darkOff" className="hover1">
                <span>Off</span>
                <input type="radio" name="dark" id="darkOff" />
            </label>
            <label htmlFor="darkOn" className="hover1">
                <span>On</span>
                <input type="radio" name="dark" id="darkOn" />
            </label>
            <div className="mmenu_main" id="">
                <div className="small_circle">
                    <LiaCompactDiscSolid className="settings_filled_icon" style={{ width: "50px" }} />
                </div>
                <div className="mmenu_col">
                    <span className="mmenu_span1">Compact mode</span>
                    <span className="mmenu_span2">Make your font size smaller so more content can fit on the screen.</span>
                </div>
            </div>
            <label htmlFor="compactOff" className="hover1">
                <span>Off</span>
                <input type="radio" name="compact" id="compactOff" />
            </label>
            <label htmlFor="compactOn" className="hover1">
                <span>On</span>
                <input type="radio" name="compact" id="compactOn" />
            </label>
            <div className="mmenu_item hover3">
                <div className="small_circle">
                    <MdKeyboardAlt />
                </div>
                <span>Keyboard</span>
                <div className="rArrow">
                    <SlArrowRight />
                </div>
            </div>
        </div>
    );
};

export default DisplayAccessibility;
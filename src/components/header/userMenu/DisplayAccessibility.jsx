import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { GoArrowLeft } from "react-icons/go";
import { SlArrowRight } from "react-icons/sl";
import { LiaCompactDiscSolid } from "react-icons/lia";
import { MdKeyboardAlt } from "react-icons/md";
import { CiDark } from "react-icons/ci";

const DisplayAccessibility = ({ setVisible }) => {
    const dispatch = useDispatch();
    const { darkTheme } = useSelector(state => ({ ...state }));

    const handleThemeToggle = (isChecked) => {
        const themeType = isChecked ? "DARK" : "LIGHT";
        dispatch({ type: themeType });
        Cookies.set("darkTheme", isChecked);

        if (isChecked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };


    return (
        <div className="absolute_wrap">
            <div className="absolute_wrap_header">
                <div className="small_circle back_menu hover1" onClick={() => setVisible(0)}>
                    <GoArrowLeft />
                </div>
                Display & Accessibility
            </div>
            <div className="mmenu_main">
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
                <input type="radio" name="dark" id="darkOff" checked={!darkTheme} onChange={() => handleThemeToggle(false)} />
            </label>
            <label htmlFor="darkOn" className="hover1">
                <span>On</span>
                <input type="radio" name="dark" id="darkOn" checked={darkTheme} onChange={() => handleThemeToggle(true)} />
            </label>
            <div className="mmenu_main">
                <div className="small_circle">
                    <LiaCompactDiscSolid className="settings_filled_icon" style={{ width: "50px" }} />
                </div>
                <div className="mmenu_col">
                    <span className="mmenu_span1">Compact mode</span>
                    <span className="mmenu_span2">Make your font size smaller so more content can fit on the screen.</span>
                </div>
            </div>
            {/* Other settings */}
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

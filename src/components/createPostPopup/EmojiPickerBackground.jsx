import Picker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import "./style.css";



const EmojiPickerBackground = ({ text, setText, user, type2, setBackground, background }) => {
    const [picker, setPicker] = useState(false);
    const [cursorPosition, setCursorPosition] = useState();
    const [showBgs, setShowBgs] = useState(false);
    const textRef = useRef(null);
    const bgRef = useRef(null);


    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleEmoji = ({ emoji }) => {
        const ref = textRef.current;
        ref.focus();
        const start = text.substring(0, ref.selectionStart);
        const end = text.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setText(newText);
        setCursorPosition(start.length + emoji.length);
    };

    // post background
    const postBackgounds = [
        "../../../public/images/postBackgrounds/1.jpg",
        "../../../public/images/postBackgrounds/2.jpg",
        "../../../public/images/postBackgrounds/3.jpg",
        "../../../public/images/postBackgrounds/4.jpg",
        "../../../public/images/postBackgrounds/5.jpg",
        "../../../public/images/postBackgrounds/6.jpg",
        "../../../public/images/postBackgrounds/7.jpg",
        "../../../public/images/postBackgrounds/8.jpg",
        "../../../public/images/postBackgrounds/9.jpg",
    ]

    // background Handler
    const backgroundHandler = (idx) => {
        bgRef.current.style.backgroundImage = `url(${postBackgounds[idx]})`;
        setBackground(postBackgounds[idx]);
        bgRef.current.classList.add("bgHandler");
    }
    const removeBackground = (idx) => {
        bgRef.current.style.backgroundImage = ``;
        setBackground("");
        bgRef.current.classList.remove("bgHandler");
    }

    return (
        <div className={
            type2 ? 'images_input' : ""
        } >
            <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
                < textarea
                    ref={textRef}
                    maxLength="250"
                    value={text}
                    placeholder={`What's on your mind, ${user.first_name}`
                    }
                    className={`post_input ${type2 ? "input2" : ""}`}
                    onChange={(e) => setText(e.target.value)}
                    style={{ paddingTop: `${background ? Math.abs(textRef.current.value.length * 0.05 - 32) : "0"}%` }}
                />
            </div >
            <div className={!type2 ? `post_emojis_wrap` : ""}>
                {picker && <div className={`comment_emoji_picker ${type2 ? 'movepicker2' : 'rlmove'}`}>
                    <Picker onEmojiClick={handleEmoji} />
                </div >}
                {!type2 && <img src="../../../icons/colorful.png" alt="" onClick={() => setShowBgs((prev) => !prev)} />}
                {
                    !type2 && showBgs && <>
                        <div className="post_backgrounds">
                            <div className="no_bg" onClick={() => removeBackground()}> </div>
                            {postBackgounds.map((bg, idx) => (
                                <img src={bg} key={idx} alt="" onClick={() => backgroundHandler(idx)} />
                            ))}
                        </div>
                    </>
                }
                <BsEmojiSmile className={`emoji_icon_large ${type2 ? 'moveleft' : ""}`} onClick={() => { setPicker((prev) => !prev) }} />
            </div >
        </div >
    );
};

export default EmojiPickerBackground;
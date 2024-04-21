import { useRef, useState } from "react";
import "./style.css";
import { IoCloseOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";




const CreatePostPopup = ({ user }) => {
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(true);
    const [images, setImages] = useState([]);
    console.log(images);
    return (
        <div className="blur">
            <div className="postBox">
                <div className="box_header">
                    <div className="small_circle">
                        <IoCloseOutline className="exit_icon" />
                    </div>
                    <span>Create Post</span>
                </div>
                <div className="box_profile">
                    <img src={user.picture} alt="" className="box_profile_img" />
                    < div className="box_col">
                        <div className="box_profile_name">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="box_privacy">
                            <img src="../../../icons/public.png" alt="" />
                            <span>Public</span>
                            <TiArrowSortedDown />
                        </div>
                    </div>
                </div>
                {!showPrev ? <>

                    <EmojiPickerBackground text={text} setText={setText} user={user} />
                </> : <>
                    <ImagePreview setShowPrev={setShowPrev} text={text} setText={setText} user={user} images={images} setImages={setImages} />
                </>}
                <AddToYourPost setShowPrev={setShowPrev} />
                <button className="post_submit">Post</button>
            </div>
        </div >
    );
};

export default CreatePostPopup;
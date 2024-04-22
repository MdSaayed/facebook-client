import { useRef, useState } from "react";
import "./style.css";
import { IoCloseOutline } from "react-icons/io5";
import { TiArrowSortedDown } from "react-icons/ti";

import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import useClickOutside from "../../helpers/useClickOutside";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import PostError from "./PostError";
import dataURItoBlob from "../../helpers/dataURItoBlob";
import { uploadImages } from "../../functions/uploadImages";




const CreatePostPopup = ({ user, setShowPostbox }) => {
    const [text, setText] = useState("");
    const [showPrev, setShowPrev] = useState(false);
    const [images, setImages] = useState([]);
    const [background, setBackground] = useState("");
    const popup = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // click outside and close post popup
    useClickOutside(popup, () => {
        setShowPostbox(false);
    });

    // post Submit
    const postSubmit = async () => {
        if (background) {
            setLoading(true);
            const response = await createPost(
                null,
                background,
                text,
                null,
                user.id,
                user.token
            );
            setLoading(false);
            if (response === "ok") {
                setBackground("");
                setText("");
                setShowPostbox(false);
            } else {
                setError(response);
            }
        } else if (images && images.length) {
            setLoading(true);
            const postImages = images.map((img) => {
                return dataURItoBlob(img);
            });
            const path = `${user.username}/post Images`;
            let formData = new FormData();
            formData.append("path", path);
            postImages.forEach((image) => {
                formData.append("file", image);
            });
            const response = await uploadImages(formData, path, user.token);
            console.log(response);
            await createPost(null, null, text, response, user.id, user.token);
            setLoading(false);
            setText("");
            setImages("");
            setShowPostbox(false);
        } else if (text) {
            setLoading(true);
            const response = await createPost(
                null,
                null,
                text,
                null,
                user.id,
                user.token
            );
            setLoading(false);
            if (response === "ok") {
                setBackground("");
                setText("");
                setShowPostbox(false);
            } else {
                setError(response);
            }
        } else {
            console.log("nothing");
        }
    };


    return (
        <div className="blur">
            <div className="postBox" ref={popup}>
                {error && <PostError error={error} setError={setError} />}
                <div className="box_header">
                    <div className="small_circle">
                        <IoCloseOutline className="exit_icon" onClick={() => setShowPostbox(false)} />
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

                    <EmojiPickerBackground text={text} setText={setText} user={user} background={background} setBackground={setBackground} />
                </> : <>
                    <ImagePreview setShowPrev={setShowPrev} text={text} setText={setText} user={user} images={images} setImages={setImages} />
                </>}
                <AddToYourPost setShowPrev={setShowPrev} />
                < button className="post_submit" onClick={() => postSubmit()} disabled={loading}>
                    {loading ? <PulseLoader color={"#fff"} size={5} /> : "Post"}
                </button >
            </div>
        </div >
    );
};

export default CreatePostPopup;
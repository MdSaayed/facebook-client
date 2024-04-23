import { useRef } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import { IoCloseOutline } from "react-icons/io5";
import addPhoto from "../../../public/images/addPhoto.png";
import phone from "../../../public/images/phone.png";
import { MdEdit } from "react-icons/md";

const ImagePreview = ({ text, setText, user, images, setImages, setShowPrev, setError }) => {
    const imageInputRef = useRef(null);

    // handle images
    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img) => {
            if (img.type !== "image/jpeg" && img.type !== "image/png" && img.type !== "image/webp" && img.type !== "image/gif" && img.type !== "image/jpg") {
                setError(`${img.name} format is unsupported! Only jpeg, Png, Webp, Gif are allowed.`);
                return;
            } else if (img.size > 1024 * 1024 * 10) {
                setError(`${img.name} Size is too large max 10mb allowed.`);
                files = files.filter((item => item.name !== imageInputRef.ane));
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (readerEvent) => {
                setImages((prevImages) => [...prevImages, readerEvent.target.result]);
            };
        });
    };


    return (
        <div className="overflow_a scrollbar">
            <EmojiPickerBackground text={text} setText={setText} user={user} type2 />
            <div className="add_pics_wrap">
                <input type="file" multiple hidden name="" id="" ref={imageInputRef} accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImages} />
                {images && images.length ? (
                    <div className="add_pics_inside1 p0">
                        <div className="preview_actions">
                            <button className="hover1">
                                <MdEdit />Edit
                            </button>
                            <button className="hover1" onClick={() => { imageInputRef.current.click(); }}>
                                <img src={addPhoto} alt="" /> Add Photos/Videos
                            </button>
                        </div>
                        <div className="small_white_circle">
                            <IoCloseOutline className="exit_icon" onClick={() => setImages([])} />
                        </div>
                        <div className={
                            images.length === 1 ?
                                "preview1"
                                : images.length === 2
                                    ? "preview2"
                                    : images.length === 3
                                        ? "preview3"
                                        : images.length === 4
                                            ? "preview4"
                                            : images.length === 5
                                                ? "preview5"
                                                : images.length % 2 === 0
                                                    ? "preview6"
                                                    : "preview6 singular_grid"
                        }>
                            {images.map((img, idx) => (
                                <img src={img} key={idx} alt="" />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="add_pics_inside1">
                        <div className="small_white_circle">
                            <IoCloseOutline className="exit_icon" onClick={() => setShowPrev(false)} />
                        </div>
                        <div className="add_col" onClick={() => { imageInputRef.current.click(); }}>
                            <div className="add_circle">
                                <img src={addPhoto} alt="" className="addPhoto_icon" />
                            </div>
                            <span>Add Photos/Videos</span>
                            <span>or drag and drop</span>
                        </div>
                    </div>
                )}
                <div className="add_pics_inside2">
                    <div className="add_circle">
                        <img src={phone} alt="" />
                    </div>
                    <div>Add photos from your mobile device.</div>
                    <span className="addphone_btn">Add</span>
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;

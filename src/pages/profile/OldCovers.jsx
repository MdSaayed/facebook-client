import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/useClickOutside";

const OldCovers = ({ photos, setCoverPicture, setShow }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const Ref = useRef(null);

    useClickOutside(Ref, () => setShow(false));

    return (
        <div className="blur">
            <div className="postBox selectCoverBox" ref={Ref}>
                <div className="box_header">
                    <div className="small_circle" onClick={() => { setShow(false) }}>
                        <MdClose />
                    </div>
                    <span>Select photo</span>
                </div>
                <div className="selectCoverBox_links">
                    <div className="selectCoverBox_link">Recent Photos</div>
                    <div className="selectCoverBox_link">Photo Albums</div>
                </div>
                <div className="old_pictures_wrap scrollbar">
                    <div className="old_pictures">
                        {photos?.filter(
                            (img) => img.folder === `${user.username}/cover_pictures`)?.map((photo) => (
                                <img
                                    src={photo.secure_url}
                                    key={photo.public_id}
                                    alt=""
                                    onClick={() => { setCoverPicture(photo.secure_url), setShow(false) }}
                                />
                            ))}
                    </div>
                    <div className="old_pictures">
                        {photos?.filter(
                            (img) => img.folder !== `${user.username}/post_images`
                        )?.map((photo) => (
                            <img
                                src={photo.secure_url}
                                key={photo.public_id}
                                alt=""
                                onClick={() => { setCoverPicture(photo.secure_url), setShow(false) }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OldCovers;
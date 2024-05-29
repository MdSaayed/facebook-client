import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/useClickOutside";
import { savePost } from "../../functions/post";

const PostMenu = ({ postUserId, userId, imagesLength, setShowMenu, postId, token, checkSaved, setCheckSaved }) => {

    const menuRef = useRef(null);

    // click outside and close post menu
    useClickOutside(menuRef, () => {
        setShowMenu(false);
    });

    // saveHandler
    const saveHandler = async () => {
          savePost(postId, token);
        if(checkSaved){
            setCheckSaved(false);
        } else {
            setCheckSaved(true);
        }
    }

    const [test, setTest] = useState(postUserId === userId ? true : false);
    return (
        <ul className="post_menu" ref={menuRef}>
            {test && <MenuItem icon="fas fa-thumbtack" title={"Pin Post"} />}
            <div onClick={() => saveHandler()}>
                {
                    checkSaved ? <MenuItem icon="fa fa-bookmark" subtitle={"Remove this from your save items."} title={"Unsave Post"} /> : <MenuItem icon="fa fa-bookmark" subtitle={"Add this to your save items."} title={"Save Post"} />
                }

            </div>
            <div className="line"></div>
            <MenuItem icon="fa fa-edit" title={"Post Edit"} />
            {!test && <MenuItem icon="fas fa-bell" title={"Turn on notification for this post."} />}
            {imagesLength && <MenuItem icon="fas fa-download" title={"Download"} />}
            {imagesLength && <MenuItem icon="fa fa-arrows-alt" title={"Enter Fullscreen"} />}
            {test && <MenuItem icon="fas fa-bell-slash" title={"Turn off notification for this post."} />}
            {test && <MenuItem icon="fas fa-globe" title={"Turn off translations."} />}
            {test && <MenuItem icon="fas fa-calendar" title={"Edit Date"} />}
            {test && <MenuItem icon="fas fa-refresh" title={"Refresh share attachment."} />}
            {test && <MenuItem icon="fas fa-archive" title={"Move to archive."} />}
            {test && <MenuItem icon="fas fa-trash" title={"Move to trash."} subtitle={"Items in your trash are deleted after 30 days."} />}
            <div className="line"></div>
            {!test && <MenuItem img="../../../icons/report.png" title={"Report post."} subtitle={"I'm concerned about this post."} />}
        </ul>
    );
};

export default PostMenu;

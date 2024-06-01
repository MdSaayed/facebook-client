import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useClickOutside from "../../helpers/useClickOutside";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";

const PostMenu = ({ postUserId, userId, imagesLength, setShowMenu, images, postId, token, checkSaved, setCheckSaved ,postRef}) => {
    const menuRef = useRef(null);

    // click outside and close post menu
    useClickOutside(menuRef, () => {
        setShowMenu(false);
    });

    // saveHandler
    const saveHandler = async () => {
        await savePost(postId, token);
        setCheckSaved(!checkSaved);
    };

    // handleDelete
    const handleDelete = async () => {
        const res = await deletePost(postId, token);
        if (res.status === "ok") {
            postRef.current.remove();
        }
        
    }

    // downloadImages
    const downloadImages = async () => {
        if (!images || images.length === 0) {
            console.error("No images to download.");
            return;
        }

        images.forEach((img, index) => {
            try {
                const url = new URL(img.url);
                const extension = url.pathname.split('.').pop().split('?')[0]; // Extract the file extension from the URL
                const fileName = `image_${index + 1}.${extension}`; // Generate a unique file name

                fetch(img.url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.blob();
                    })
                    .then(blob => {
                        saveAs(blob, fileName);
                        console.log(`Image downloaded: ${fileName}`);
                    })
                    .catch(error => {
                        console.error(`Failed to download image from ${img.url}:`, error);
                    });
            } catch (error) {
                console.error(`Invalid URL: ${img.url}`, error);
            }
        });
    };

    const [test, setTest] = useState(postUserId === userId);

    return (
        <ul className="post_menu" ref={menuRef}>
            {test && <MenuItem icon="fas fa-thumbtack" title={"Pin Post"} />}
            <div onClick={() => saveHandler()}>
                {checkSaved
                    ? <MenuItem icon="fa fa-bookmark" subtitle={"Remove this from your save items."} title={"Unsave Post"} />
                    : <MenuItem icon="fa fa-bookmark" subtitle={"Add this to your save items."} title={"Save Post"} />}
            </div>
            <div className="line"></div>
            <MenuItem icon="fa fa-edit" title={"Post Edit"} />
            {!test && <MenuItem icon="fas fa-bell" title={"Turn on notification for this post."} />}
            {imagesLength && (
                <div onClick={() => downloadImages()}>
                    <MenuItem icon="fas fa-download" title={"Download"} />
                </div>
            )}
            {imagesLength && <MenuItem icon="fa fa-arrows-alt" title={"Enter Fullscreen"} />}
            {test && <MenuItem icon="fas fa-bell-slash" title={"Turn off notification for this post."} />}
            {test && <MenuItem icon="fas fa-globe" title={"Turn off translations."} />}
            {test && <MenuItem icon="fas fa-calendar" title={"Edit Date"} />}
            {test && <MenuItem icon="fas fa-refresh" title={"Refresh share attachment."} />}
            {test && <div >
                <MenuItem icon="fas fa-archive" title={"Move to archive."} />
            </div>}
            <div onClick={() => handleDelete()}>
                {test && <MenuItem icon="fas fa-trash" title={"Move to trash."} subtitle={"Items in your trash are deleted after 30 days."} />}
            </div>
            <div className="line"></div>
            {!test && <MenuItem img="../../../icons/report.png" title={"Report post."} subtitle={"I'm concerned about this post."} />}
        </ul>
    );
};

export default PostMenu;

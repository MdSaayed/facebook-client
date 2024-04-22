import photo from "../../../public/images/photo.png";
import tag from "../../../public/images/tag.png";
import felling from "../../../public/images/felling.png";
import map from "../../../public/images/map.png";
import Dott from "../../../public/icons/svg/dott";


const AddToYourPost = ({ setShowPrev }) => {
    return (
        <div className="addtoyourpost">
            <div className="addto_text">Add to your post</div>
            <div className="post_header_right hover1">
                <img src={photo} alt="" onClick={() => { setShowPrev(true) }} />  </div>
            <div className="post_header_right hover1">
                <img src={tag} alt="" />
            </div>
            <div className="post_header_right hover1">
                <img src={felling} alt="" />
            </div>
            <div className="post_header_right hover1">
                <img src={map} alt="" />
            </div>
            <div className="post_header_right hover1">
                <Dott color="#65676b" />
            </div>
            <div className="post_header_right hover1">    </div>
        </div >
    );
};

export default AddToYourPost;
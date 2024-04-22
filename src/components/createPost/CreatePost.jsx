import "./style.css";

const CreatePost = ({ user, setShowPostbox }) => {
    return (
        <div className="createPost">
            <div className="createPost_header">
                <img src={user?.picture} alt="" />
                <div className="open_post hover2" onClick={() => setShowPostbox(true)}>
                    What's on your mind, {user?.first_name}
                </div>
            </div>
            <div className="create_splitter"></div>
            <div className="createPost_body">
                <div className="createPost_icon hover1">
                    <img src="./images/liveVideo.png" alt="" />
                    Live Video
                </div>
                <div className="createPost_icon hover1">
                    <img src="./images/photo.png" alt="" />
                    Photo/Video
                </div>
                <div className="createPost_icon hover1">
                    <img src="./images/felling.png" alt="" />
                    Feeling/Activity
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
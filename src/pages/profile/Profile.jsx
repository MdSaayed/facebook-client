import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header/Header";
import "./style.css";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfielPictureInfos";
import ProfileMenu from "./ProfileMenu";
import PpYouMayKnow from "./PpYouMayKnow";
import CreatePost from "../../components/createPost/CreatePost";
import CreatePostPopup from "../../components/createPostPopup/CreatePostPopup";
import GridPosts from "./GridPosts";
import Post from "../../components/posts/Post";
import Photos from "./Photos";
import Friends from "./Friends";



const Profile = () => {
    const [showPostBox, setShowPostbox] = useState(false);

    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    var userName = username === undefined ? user.username : username;
    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {},
        error: "",
    });
    useEffect(() => {
        getProfile();
    }, [userName]);


    const getProfile = async () => {
        try {
            dispatch({
                type: "PROFILE_REQUEST",
            });
            const { data } = await axios.get(
                `http://localhost:8000/getProfile/${userName}`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            if (data.ok === false) {
                navigate("/profile");
            } else {
                dispatch({
                    type: "PROFILE_SUCCESS",
                    payload: data,
                });
            }
        } catch (error) {
            dispatch({
                type: "PROFILE_ERROR",
                payload: error.response.data.message,
            });
        }
    };

    var visitor = userName === user?.username ? false : true;


    return (
        <div className="profile">
            <Header page="profile" />
            <div className="profile_top">
                <div className="profile_container">
                    <Cover cover={profile.cover} visitor={visitor} />
                    <ProfielPictureInfos profile={profile} visitor={visitor} />
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PpYouMayKnow />
                        <div className="profile_grid">
                            <div className="profile_left">
                                <Photos username={userName} token={user.token} />
                                <Friends friends={profile.friends} />
                                <div className="relative_fb_copyright" >
                                    <Link to={"/"} >Privacy</Link>
                                    <span>. </span>
                                    <Link to={"/"} >Terms</Link>
                                    <span>. </span>
                                    <Link to={"/"} >Advertising</Link>
                                    <span>. </span>
                                    <Link to={"/"} >Privacy</Link>
                                    <span>. </span>
                                    <Link to={"/"} >Add Choices</Link>
                                    <span>. </span>
                                    <Link to={"/"} >Cookies</Link>
                                    <span>. </span>
                                    <Link to={"/"} >More</Link>
                                    <span>. </span><br />
                                    Meta &copy; 2024
                                </div>
                            </div>
                            <div className="profile_right">
                                {!visitor && (
                                    <>
                                        <CreatePost user={user} profile={profile} setShowPostbox={setShowPostbox} />
                                        {showPostBox && <CreatePostPopup user={user} setShowPostbox={setShowPostbox} />}
                                    </>
                                )}
                                <GridPosts />
                                <div className="posts">
                                    {profile.posts && profile.posts.length ? profile.posts.map((post, idx) => <Post post={post} user={user} key={idx} profile={profile} />) : (
                                        < div className="no_posts">No Posts available.</div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Profile;

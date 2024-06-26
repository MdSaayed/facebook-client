import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header/Header";
import "./style.css";
import Cover from "./Cover";
import ProfileMenu from "./ProfileMenu";
import PpYouMayKnow from "./PpYouMayKnow";
import CreatePost from "../../components/createPost/CreatePost";
import CreatePostPopup from "../../components/createPostPopup/CreatePostPopup";
import GridPosts from "./GridPosts";
import Post from "../../components/posts/Post";
import Photos from "./Photos";
import Friends from "./Friends";
import { useMediaQuery } from "react-responsive";
import ProfielPictureInfos from "./ProfielPictureInfos";
import Intro from "../../components/intro/Intro";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { HashLoader } from "react-spinners";

const Profile = () => {
    const [showPostBox, setShowPostbox] = useState(false);
    const { username } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [photos, setPhotos] = useState({});
    const userName = username || user.username;
    const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
        loading: false,
        profile: {},
        error: "",
    });

    useEffect(() => {
        getProfile();
    }, [userName]);

    useEffect(() => {
        setOthername(profile?.details?.otherName);
    }, [profile]);

    const visitor = userName !== user?.username;
    const [othername, setOthername] = useState();
    const path = `${userName}/*`;
    const max = 30;
    const sort = "desc";

    const getProfile = async () => {
        try {
            dispatch({ type: "PROFILE_REQUEST" });
            const { data } = await axios.get(`http://localhost:8000/getProfile/${userName}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            if (data.ok === false) {
                navigate("/profile");
            } else {
                try {
                    const images = await axios.post(
                        `http://localhost:8000/listImages`,
                        { path, sort, max },
                        {
                            headers: {
                                Authorization: `Bearer ${user?.token}`,
                            },
                        }
                    );
                    setPhotos(images.data);
                } catch (error) {
                    console.log(error);
                }
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

    const profileTop = useRef(null);
    const leftSide = useRef(null);
    const [height, setHeight] = useState();
    const [leftHeight, setLeftHeight] = useState();
    const [scrollHeight, setScrollHeight] = useState();

    useEffect(() => {
        setHeight(profileTop.current.clientHeight + 300);
        setLeftHeight(leftSide.current.clientHeight);
        window.addEventListener("scroll", getScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", getScroll);
        };
    }, [loading, scrollHeight]);

    const check = useMediaQuery({
        query: "(min-width:901px)",
    });

    const getScroll = () => {
        setScrollHeight(window.pageYOffset);
    };

    return (
        <div className="profile">
            <Header page="profile" />
            <div className="profile_top" ref={profileTop}>
                <div className="profile_container">
                    {
                        loading ? (
                            <SkeletonTheme baseColor="#ccc" highlightColor="#ddd">
                                <div className="profile_cover">
                                    <Skeleton height={347} containerClassName="avatar-skeleton" style={{
                                        borderBottomLeftRadius: "8px",
                                        borderBottomRightRadius: "8px"
                                    }} />
                                </div>
                                <div className="profile_img_wrap" style={{ marginBottom: "-3.2rem", transform: "translateY(-8px)" }}>
                                    <div className="profile_w_left">
                                        <Skeleton
                                            circle
                                            height={180}
                                            width={180}
                                            containerClassName="avatar-skeleton"
                                            style={{ transform: "translateY(-3.3rem)" }}
                                        />
                                        <div className="profile_w_col">
                                            <div className="profile_name">
                                                <Skeleton
                                                    height={35}
                                                    width={200}
                                                    containerClassName="avatar-skeleton"
                                                />
                                                <Skeleton
                                                    height={30}
                                                    width={100}
                                                    containerClassName="avatar-skeleton"
                                                    style={{ transform: "translateY(2.5px)" }}
                                                />
                                            </div>
                                            <div className="profile_friend_count">
                                                <Skeleton
                                                    height={20}
                                                    width={90}
                                                    containerClassName="avatar-skeleton"
                                                    style={{ marginTop: "5px" }}
                                                />
                                            </div>
                                            <div className="profile_friend_imgs">
                                                {Array.from({ length: 6 }).map((_, idx) => (
                                                    <Skeleton
                                                        circle
                                                        key={idx}
                                                        height={32}
                                                        width={32}
                                                        containerClassName="avatar-skeleton"
                                                        style={{ transform: `translateX(${-idx * 7}px)` }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`friendship ${!visitor && "fix"}`}>
                                        <Skeleton height={36} width={120} containerClassName="avatar-skeleton" />
                                        <div className="flex">
                                            <Skeleton height={36} width={120} containerClassName="avatar-skeleton" />
                                            {visitor && (
                                                <Skeleton height={36} width={120} containerClassName="avatar-skeleton" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SkeletonTheme>
                        ) : (
                            <>
                                <Cover cover={profile.cover} visitor={visitor} photos={photos.resources} />
                                <ProfielPictureInfos profile={profile} visitor={visitor} photos={photos.resources} othername={othername} />
                            </>
                        )
                    }
                    <ProfileMenu />
                </div>
            </div>
            <div className="profile_bottom">
                <div className="profile_container">
                    <div className="bottom_container">
                        <PpYouMayKnow />
                        <div className={`profile_grid ${check && scrollHeight >= height && leftHeight > 1000 ? "scrollFixed showLess" : check && scrollHeight >= height && leftHeight < 1000 && "scrollFixed showMore"}`}>
                            <div className="profile_left" ref={leftSide}>
                                {
                                    loading ? <>
                                        <div className="profile_card">
                                            <div className="profile_card_header">
                                                Intro
                                            </div>
                                            <div className="skeleton_loader">
                                                <HashLoader color="#1876f2" />
                                            </div>
                                        </div>
                                        <div className="profile_card">
                                            <div className="profile_card_header">
                                                Photos
                                                <div className="profile_header_link">
                                                    See all photos
                                                </div>
                                            </div>
                                            <div className="skeleton_loader">
                                                <HashLoader color="#1876f2" />
                                            </div>
                                        </div>
                                        <div className="profile_card">
                                            <div className="profile_card_header">
                                                Friends
                                                <div className="profile_header_link">
                                                    See all Friends
                                                </div>
                                            </div>
                                            <div className="skeleton_loader">
                                                <HashLoader color="#1876f2" />
                                            </div>
                                        </div>
                                    </> : <>
                                        <Intro
                                            detailss={profile.details}
                                            visitor={visitor}
                                            setOthername={setOthername}
                                        />
                                        <Photos username={userName} token={user.token} photos={photos} />
                                        <Friends friends={profile.friends} />
                                    </>
                                }
                                <div className="relative_fb_copyright">
                                    <Link to={"/"}>Privacy</Link>
                                    <span>. </span>
                                    <Link to={"/"}>Terms</Link>
                                    <span>. </span>
                                    <Link to={"/"}>Advertising</Link>
                                    <span>. </span>
                                    <Link to={"/"}>Privacy</Link>
                                    <span>. </span>
                                    <Link to={"/"}>Add Choices</Link>
                                    <span>. </span>
                                    <Link to={"/"}>Cookies</Link>
                                    <span>. </span>
                                    <Link to={"/"}>More</Link>
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

                                {
                                    loading ? <div className="skeleton_loader">
                                        <HashLoader color="#1876f2" />
                                    </div> : <>
                                        <div className="posts">
                                            {profile.posts && profile.posts.length ? profile.posts.map((post, idx) => <Post post={post} user={user} key={idx} profile={profile} />) : (
                                                <div className="no_posts">No Posts available.</div>
                                            )}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

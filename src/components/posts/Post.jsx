import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Public from '../../../public/icons/svg/Public';
import Dott from '../../../public/icons/svg/dott';
import './style.css';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { PiShareFatThin } from "react-icons/pi";
import ReactPopup from './ReactPopup';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import '@fortawesome/fontawesome-free/css/all.css';





const Post = ({ post, user, profile }) => {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    console.log(post);

    return (
        <div className='post' style={{ width: `${profile && "100%"}` }}>
            <div className="post_header">
                <Link to={`/profile/${post.user.username}`} className="post_header_left">
                    <img src={post?.user?.picture} alt={post?.user?.username} />
                    <div className="header_col">
                        <div className="post_profile_name">
                            {post?.user?.first_name} {post?.user?.last_name}
                            <div className="updated_p">
                                {post.type === "profilePicture" &&
                                    `upload ${post.user.gender === "male" ? "his" : "her"} profile picture`}
                                {post.type === "cover" &&
                                    `updated  ${post.user.gender === "male" ? "his" : "her"} profile picture`}
                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>{post.createdAt}</Moment>
                            <span>.</span>
                            <Public color="#828387" size="15px" />
                        </div>
                    </div>
                </Link>
                <div className="post_header_right hover1" onClick={() => setShowMenu((prev) => !prev)} >
                    <Dott color="#828387" size="18px" />

                </div>
            </div>

            {post.background ? (
                <div className="post_bg" style={{ backgroundImage: `url(${post.background})` }}>
                    <div className="post_bg_text">{post.text}</div>
                </div>
            ) : post.type === null ? (
                <>
                    <div className="post_text">{post.text}</div>
                    {post.images && post.images.length && (
                        <div
                            className={
                                post.images.length === 1
                                    ? "grid_1"
                                    : post.images.length === 2
                                        ? "grid_2"
                                        : post.images.length === 3
                                            ? "grid_3"
                                            : post.images.length === 4
                                                ? "grid_4"
                                                : post.images.length >= 5 && "grid_5"
                            }
                        >
                            {post.images.slice(0, 5).map((image, i) => (
                                <img src={image.url} key={i} alt="" className={`img-${i}`} />
                            ))}
                            {post.images.length > 5 && (
                                <div className="more-pics-shadow">
                                    +{post.images.length - 5}
                                </div>
                            )}
                        </div>
                    )}
                </>
            ) : post.type === "profilePicture" ? (<div className='post_profile_wrap'>
                <div className="post_updated_bg">
                    <img src={post.user.cover} alt="" />
                </div>
                <img src={post.images[0].url} alt="" className="post_updated_picture" />
            </div>) : (
                <div className="post_cover_wrap"></div>
            )
            }
            <div className="post_infos">
                <div className="reacts_count">
                    <div className="reacts_count_imgs"></div>
                    <div className="reacts_count_num"></div>
                </div>
                <div className="to_right">
                    <div className="comments_count">13 comments</div>
                    <div className="share_count">1 share</div>
                </div>
            </div>
            <div className="post_actions">
                <ReactPopup visible={visible} setVisible={setVisible} />
                <div className="post_aciton hover1" onMouseOver={() => setTimeout(() => { setVisible(true) }, 500)} onMouseLeave={() => setTimeout(() => { setVisible(false) }, 500)}>
                    <AiOutlineLike style={{ fontSize: "20px" }} />
                    <span>Like</span>
                </div>
                <div className="post_aciton hover1">
                    <FaRegComment style={{ fontSize: "20px" }} />
                    <span>Comment</span>
                </div>
                <div className="post_aciton hover1">
                    <PiShareFatThin style={{ fontSize: "20px" }} />
                    <span>Share</span>
                </div>
            </div>
            <div className="comments_wrap">
                <div className="comments_order">
                    <CreateComment user={user} />
                </div>
            </div>
            {
                showMenu && <>
                    < PostMenu userId={user.id} postUserId={post.user._id} imagesLength={post?.images?.length} />
                </>
            }

        </div >
    );
};

export default Post;

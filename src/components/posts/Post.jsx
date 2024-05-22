import React, { useEffect, useState } from 'react';
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
import { getReacts, reactPost } from '../../functions/post';

const Post = ({ post, user, profile }) => {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [reacts, setReacts] = useState([]);
    const [check, setCheck] = useState('');
    const [totalReact, setTotalReact] = useState(0);

    useEffect(() => {
        getPostReacts();
    }, [post]);

    // Get reacts
    const getPostReacts = async () => {
        const res = await getReacts(post._id, user?.token);
        setReacts(res?.reacts);
        setCheck(res.check);
        setTotalReact(res.reacts.reduce((total, react) => total + react.count, 0));
    }

    // Handle react
    const reacthandler = async (type) => {
        await reactPost(post?._id, type, user?.token);

        if (check === type) {
            setCheck('');
            const index = reacts.findIndex((x) => x.react === type);
            if (index !== -1) {
                const newReacts = [...reacts];
                newReacts[index].count--;
                setReacts(newReacts);
                setTotalReact((prev) => prev - 1);
            }
        } else {
            const newReacts = [...reacts];
            if (check) {
                const oldReactIndex = newReacts.findIndex((x) => x.react === check);
                if (oldReactIndex !== -1) {
                    newReacts[oldReactIndex].count--;
                }
            }
            const newReactIndex = newReacts.findIndex((x) => x.react === type);
            if (newReactIndex !== -1) {
                newReacts[newReactIndex].count++;
            }
            setReacts(newReacts);
            setCheck(type);
            setTotalReact((prev) => prev + (check ? 0 : 1));
        }
    }

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
                                {post.type === "coverPicture" &&
                                    `updated  ${post.user.gender === "male" ? "his" : "her"} cover picture`}
                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>{post.createdAt}</Moment>
                            <span>.</span>
                            <Public color="#828387" size="15px" />
                        </div>
                    </div>
                </Link>
                <div className="post_header_right hover1" onClick={() => setShowMenu((prev) => !prev)}>
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
                <div className="post_cover_wrap">
                    <img src={post.images[0].url} alt="" />
                </div>
            )}

            <div className="post_infos">
                <div className="reacts_count">
                    <div className="reacts_count_imgs">
                        {reacts && reacts.sort((a, b) => b.count - a.count).slice(0, 3).map((react, idx) => (
                            react?.count > 0 && (
                                <img
                                    src={`../../../reacts/${react.react}.svg`}
                                    key={idx}
                                    alt={react.react}
                                />
                            )
                        ))}
                    </div>
                    <div className="reacts_count_num">{totalReact > 0 && totalReact}</div>
                </div>
                <div className="to_right">
                    <div className="comments_count">13 comments</div>
                    <div className="share_count">1 share</div>
                </div>
            </div>

            <div className="post_actions">
                <ReactPopup visible={visible} setVisible={setVisible} reacthandler={reacthandler} />
                <div
                    className="post_action hover1"
                    onMouseOver={() => setTimeout(() => { setVisible(true) }, 500)}
                    onMouseLeave={() => setTimeout(() => { setVisible(false) }, 500)}
                    onClick={() => reacthandler(check ? check : 'like')}
                >
                   {
                        check ? <img src={`../../../reacts/${check}.svg`} style={{ width: '18px' }} className='small_react' alt={check} /> : <>
                            <AiOutlineLike style={{ fontSize: "18px" }} />
                        </>
                    }
                    <span style={{
                        color: check === "like" ? '#4267b2'
                            : check === 'love' ? '#f63459'
                                : check === 'haha' ? '#f7b125'
                                    : check === 'wow' ? '#f7b125'
                                        : check === 'sad' ? '#f7b125'
                                            : check === "angry" ? '#e4605a'
                                                : ''
                    }}>
                        {check ? check : "Like"}
                    </span>
                </div>
                <div className="post_action hover1">
                    <FaRegComment style={{ fontSize: "20px" }} />
                    <span>Comment</span>
                </div>
                <div className="post_action hover1">
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
                showMenu && <PostMenu userId={user.id} postUserId={post.user._id} imagesLength={post?.images?.length} />
            }
        </div>
    );
};

export default Post;

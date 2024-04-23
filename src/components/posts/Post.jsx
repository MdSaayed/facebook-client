import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Public from '../../../public/icons/svg/Public';
import Dott from '../../../public/icons/svg/dott';
import './style.css';

const Post = ({ post }) => {
    return (
        <div className='post'>
            <div className="post_header">
                <Link to={`/profile/${post.user.username}`} className="post_header_left">
                    <img src={post?.user?.picture} alt={post?.user?.username} />
                    <div className="header_col">
                        {post?.user?.first_name} {post?.user?.last_name}
                        <div className="upload_p">
                            {post.type === "profilePicture" &&
                                `upload ${post.user.gender === "male" ? "his" : "her"} profile picture`}
                            {post.type === "cover" &&
                                `updated  ${post.user.gender === "male" ? "his" : "her"} profile picture`}
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>{post.createdAt}</Moment>
                            <span>.</span>
                            <Public color="#828387" size="15px" />
                        </div>
                    </div>
                </Link>
                <div className="post_header_right hover1">
                    <Dott color="#828387" size="18px" />
                </div>
            </div>
            {post.background ? (
                <div className="post_bg" style={{ backgroundImage: `url(${post.background})` }}>
                    <div className="post_bg_text">{post.text}</div>
                </div>
            ) : (
                <>
                    <div className="post_text">{post.text}</div>
                    {post.images && post.images.length > 0 && (
                        <div className={
                            post.images.length === 1 ? 'grid_1' :
                                post.images.length === 2 ? 'grid_2' :
                                    post.images.length === 3 ? 'grid_3' :
                                        post.images.length === 4 ? 'grid_4' :
                                            'grid_5'
                        }>
                            {post.images.slice(0, 5).map((image, idx) => (
                                <img src={image.url} key={idx} alt="" className={`img-${idx}`} />
                            ))}
                            {

                                post.images.length > 5 && <>
                                    <div className="more-pics-shadow">
                                        +{post.images.length - 5}
                                    </div>
                                </>
                            }
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Post;

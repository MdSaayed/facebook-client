import React from 'react';
import Moment from 'react-moment';

const Comment = ({ comment }) => {

    return (
        <div className="comment">
            <img src={comment?.commentBy?.picture} alt={`${comment?.commentBy?.first_name}'s profile`} className="comment_img" />
            <div className="comment_col">
                <div className="comment_wrap">
                    <div className="comment_name">
                        <span>{comment?.commentBy?.first_name}</span>
                        <span>{comment?.commentBy?.last_name}</span>
                    </div>
                    <div className="comment_text">{comment?.comment}</div>
                </div>
                {comment?.image && <img src={comment.image} alt="Comment Image" className="comment_image" />}
                <div className="comment_actions">
                    <span>Like</span>
                    <span>Reply</span>
                    <span>
                        <Moment fromNow interval={30}>{comment?.commentAt}</Moment >
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Comment;

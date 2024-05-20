import { Link } from "react-router-dom";

const Friends = ({ friends }) => {
    const friendsCount = friends?.length || 0;

    return (
        <div className="profile_card">
            <div className="profile_card_header">
                Friend
                <div className="profile_header_link">See all friends</div>
            </div>
            {
                friends && (
                    <div className="profile_card_count">
                        {friendsCount === 0 ? "" : `${friendsCount} Friend${friendsCount > 1 ? "s" : ""}`}
                    </div>
                )
            }
            {friends && friendsCount > 0 && (
                <div className="profile_card_grid">
                    {friends?.slice(0, 9)?.map((friend) => (
                        <Link to={`/profile/${friend?.username}`} className="profile_photo_card" key={friend.id}>
                            <img src={friend.picture} alt="" />
                            <span>{friend?.first_name} {friend?.last_name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Friends;

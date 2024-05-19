import { useRef, useState } from "react";
import useClickOutside from "../../helpers/useClickOutside";


const Friendship = ({ friendship }) => {
    const [friendsMenu, setFriendsMenu] = useState(false);
    const [respondMenu, setRespondMenu] = useState(false);
    const menu = useRef(null);
    const menu1 = useRef(null);

    // click outside
    useClickOutside(menu, () => setFriendsMenu(false));
    useClickOutside(menu1, () => setRespondMenu(false));


    return (
        <div className="friendship">
            {
                friendship?.friends ? (
                    <div className="friends_menu_wrap">
                        <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
                            <img src="../../../icons/friends.png" alt="" />
                            <span>Friends</span>
                        </button>
                        {
                            friendsMenu && <div className="open_cover_menu hover1" ref={menu}>
                                <div className="open_cover_menu_item">
                                    <img src="../../../icons/favoritesOutline.png" alt="" />
                                    Favorites
                                </div>
                                <div className="open_cover_menu_item hover1">
                                    <img src="../../../icons/editFriends.png" alt="" />
                                    Edit Friend list
                                </div>
                                {
                                    friendship?.following ? (
                                        <div className="open_cover_menu_item hover1">
                                            <img src="../../../icons/unfollowOutlined.png" alt="" />
                                            Unfollow
                                        </div>
                                    ) : (
                                        <div className="open_cover_menu_item hover1">
                                            <img src="../../../icons/unfollowOutlined.png" alt="" />
                                            Follow
                                        </div>
                                    )
                                }
                                <div className="open_cover_menu_item hover1">
                                    <img style={{ width: "30px" }} src="../../../icons/unfriend.png" alt="" />
                                    Unfriend
                                </div>
                            </div>
                        }
                    </div>
                ) : !friendship?.requestSent && !friendship?.requestReceived && (
                    <button className="blue_btn" >
                        <img src="../../../icons/addFriend.png" alt="" className="invert" />
                        <span>Add Friends</span>
                    </button>
                )
            }
            {
                friendship?.requestSent ? (
                    <button className="blue_btn">
                        <img src="../../../icons/cancelRequest.png" alt="" className="invert" />
                        <span>Cancel Request</span>
                    </button>
                ) : <>
                    {
                        friendship?.requestReceived && <div className="friends_menu_wrap">
                            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
                                <img src="../../../icons/friends.png" alt="" />
                                <span>Respond</span>
                            </button>
                            {
                                respondMenu && <div className="open_cover_menu " ref={menu1}>
                                    <div className="open_cover_menu_item hover1">
                                        Confirm
                                    </div>
                                    <div className="open_cover_menu_item hover1">
                                        Delete
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </>
            }
            {
                friendship?.following ? <>
                    <button className="gray_btn">
                        <img src="../../../icons/follow.png" alt="" />
                        <span>Following</span>
                    </button>
                </> : <>
                    <button className="blue_btn">
                        <img src="../../../icons/follow.png" alt="" className="invert" />
                        <span>Follow</span>
                    </button>
                </>
            }
            <button className={`${friendship?.friends ? "blue_btn" : "gray_btn"}`}>
                <img src="../../../icons/message.png" alt="" className={`${friendship?.friends ? "invert" : ""}`} />
                <span>Message</span>
            </button>
        </div >
    );
};

export default Friendship;
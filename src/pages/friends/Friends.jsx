import FriendsIcon from "../../../public/icons/svg/FriendsIcon";
import Header from "../../components/header/Header";
import { SlArrowRight } from "react-icons/sl";
import "./style.css";
import { BiSolidGift } from "react-icons/bi";
import { IoSettingsSharp, IoPaperPlaneOutline } from "react-icons/io5";
import { IoPersonAdd, IoBulb, IoPeople, IoList } from "react-icons/io5";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { getFriendsPageInfo } from "../../functions/user";
import { friendspage } from "../../functions/reducers";
import { Link, useParams } from "react-router-dom";
import Card from "./Card";




const Friends = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const { type } = useParams();

    const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
        loading: false,
        data: {},
        error: "",
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        dispatch({ type: "FRIENDS_REQUEST" });
        const data = await getFriendsPageInfo(user?.token);
        if (data.status === "ok") {
            dispatch({ type: "FRIENDS_SUCCESS", payload: data.data })
        } else {
            dispatch({ type: "FRIENDS_ERROR", payload: data.data })
        }
    }

    console.log(type);

    return (
        <>
            <Header page="friends" />
            <div className="friends">
                <div className="friends_left">
                    <div className="friends_left_header">
                        <h3>Friends</h3>
                        <div className="small_circle">
                            <IoSettingsSharp />
                        </div>
                    </div>
                    <div className="friends_left_wrap">
                        <Link to="/friends" className={`mmenu_item hover3 ${type === undefined && "active_friends"}`}>
                            <div className="small_circle" >
                                <FriendsIcon color={"#000"} />
                            </div>
                            <span>Home</span>
                            <div className="rArrow">
                                <SlArrowRight />
                            </div>
                        </Link>
                    </div>
                    <Link to={`/friends/requests`} className={`mmenu_item hover3 ${type === "requests" && "active_friends"}`}>
                        <div className="small_circle" >
                            <IoPersonAdd />
                        </div>
                        <span>Friend Requests</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </Link>
                    <Link to={`/friends/sentRequests`} className={`mmenu_item hover3 ${type === "sentRequests" && "active_friends"}`}>
                        <div className="small_circle" >
                            <IoPaperPlaneOutline />
                        </div>
                        <span>Send Requests</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </Link>
                    <div className="mmenu_item hover3">
                        <div className="small_circle" >
                            <IoBulb />
                        </div>
                        <span>Suggestions</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </div>
                    <Link to={`/friends/friends`} className={`mmenu_item hover3 ${type === "friends" && "active_friends"}`}>
                        <div className="small_circle" >
                            <IoPeople />
                        </div>
                        <span>All friends</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </Link>
                    <div className="mmenu_item hover3">
                        <div className="small_circle" >
                            <BiSolidGift />
                        </div>
                        <span>Birthdays</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </div>
                    <div className="mmenu_item hover3">
                        <div className="small_circle" >
                            <IoList />
                        </div>
                        <span>Custom Lists</span>
                        <div className="rArrow">
                            <SlArrowRight />
                        </div>
                    </div>
                </div>
                <div className="friends_right">
                    {type === undefined || type === "requests" ? (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Friend Requests</h3>
                               {type===undefined &&  <Link to={`/friends/requests`} className="see_link hover3">See all</Link>}
                            </div>
                            <div className="flex_wrap">
                                {data?.requests &&
                                    data?.requests?.map((user) => (
                                        <Card userr={user} key={user?._d} type="request" getData={getData} />
                                    ))}
                            </div>
                        </div>
                    ) : null}

                    {type === undefined || type === "sentRequests" ? (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Sent Requests</h3>
                                {type === undefined && <Link to={`/friends/sentRequests`} className="see_link hover3">See all</Link>}
                            </div>
                            <div className="flex_wrap">
                                {data?.sentRequests &&
                                    data?.sentRequests?.map((user) => (
                                        <Card userr={user} key={user?._d} type="sentRequest" getData={getData} />
                                    ))}
                            </div>
                        </div>
                    ) : null}

                    {type === undefined || type === "friends" ? (
                        <div className="friends_right_wrap">
                            <div className="friends_left_header">
                                <h3>Friends</h3>
                                {type === undefined && <Link to={`/friends/friends`} className="see_link hover3">See all</Link>}
                            </div>
                            <div className="flex_wrap">
                                {data?.friends &&
                                    data?.friends?.map((user) => (
                                        <Card userr={user} key={user?._d} type="friends" getData={getData} />
                                    ))}
                            </div>
                        </div>
                    ) : null}
                </div>

            </div>
        </>
    );
};

export default Friends;

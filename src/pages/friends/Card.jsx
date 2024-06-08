import { Link } from "react-router-dom";
import { acceptRequest, cancelRequest, deleteRequest } from "../../functions/user";
import { useSelector } from "react-redux";

const Card = ({ userr, type, getData }) => {
    const { user } = useSelector((state) => ({ ...state }));

    //  cancel request functionality
    const cancelRequestHandler = async (id) => {
        const res = await cancelRequest(id, user?.token);
        if (res == "ok") {
            getData();
        }
    }

    // confirm handler
    const confirmHandler = async (id) => {
        const res = await acceptRequest(id, user?.token);
        if (res == "ok") {
            getData();
        }
    }
    // confirm handler
    const deleteHandler = async (id) => {
        const res = await deleteRequest(id, user?.token);
        if (res == "ok") {
            getData();
        }
    }

    return (
        <div className='req_card'>
            <Link to={`/profile/${userr?.username}`}>
                <img src={userr?.picture} alt="" />
            </Link>
            {userr.first_name} {userr.last_name}
            {
                type === "sentRequest" ? (
                    <div className="button blue_btn" onClick={() => cancelRequestHandler(userr?._id)} >Cancel Request</div>
                ) : (
                    type === "request" ?
                        <>
                            <button className="blue_btn" onClick={() => confirmHandler(userr?._id)}>Confirm</button>
                            <button className="gray_btn" onClick={() => deleteHandler(userr?._id)}>Delete</button>
                        </>
                        : ""
                )
            }
        </div >
    );
};

export default Card;
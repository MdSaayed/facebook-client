import LeftLink from "./LeftLink";
import "./style.css";
import { useSelector } from "react-redux";
import { left } from "../../../data/home";


const LeftHome = () => {
    const { user } = useSelector((user) => ({ ...user }));

    return (
        <div className="left_home">
            <div className="left_link">
                <img src={user.picture} alt="" />
                <span>{user.first_name} {user.last_name}</span>
            </div>
            {
                left.slice(0, 8).map((link, idx) => {
                    < LeftLink key={ } />
                })
            }
        </div>
    );
};

export default LeftHome;
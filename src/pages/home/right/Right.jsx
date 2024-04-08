import Search from "../../../components/search/Search";
import Contact from "./Contact";
import "./style.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiVideoAddLine } from "react-icons/ri";


const HomeRight = ({ user }) => {
    const color = "65676b";

    return (
        <div className="right_home">
            <div className="heading">Sponsored</div>
            <div className="splitter1"></div>
            <div className="contacts_wrap">
                <div className="contacts_header">
                    <div className="contacts_header_left">Contacts</div>
                    <div className="contacts_header_right">
                        <div className="contact_circle hover1">
                            <RiVideoAddLine style={{ color: color }} />
                        </div>
                        <div className="contact_circle hover1">
                            <Search style={{ color: color }} />
                        </div>
                        <div className="contact_circle hover1">
                            <HiOutlineDotsHorizontal style={{ color: color }} />
                        </div>
                    </div>
                </div>
                <div className="contacts_list">
                    <Contact user={user} />
                </div>
            </div>
        </div >
    );
};

export default HomeRight;

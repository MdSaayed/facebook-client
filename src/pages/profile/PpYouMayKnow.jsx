import Dott from "../../../public/icons/svg/dott";
import { stories } from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";

const PpYouMayKnow = () => {
    return (
        <div className="pplumayknow">
            <div className="pplumayknow_header"> Pepole You May Know
                <div className="post_header_right ppl_circle hover1">
                    <Dott color="#" size="16" />
                </div>
            </div>
            <div className="pplumayknow_list">
                {
                    stories.map((item, idx) => (<AddFriendSmallCard key={idx} item={item} />))
                }
            </div>
        </div>
    );
};

export default PpYouMayKnow;
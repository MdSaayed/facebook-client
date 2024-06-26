import { AiOutlinePlus } from "react-icons/ai";
import { stories } from "../../../data/home";
import "./style.css";
import Story from "./Story";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useMediaQuery } from "react-responsive";


const Stories = () => {
    const query1175px = useMediaQuery({
        query: "(max-width: 1175px)",
    });
    const query1030px = useMediaQuery({
        query: "(max-width: 1030px)",
    });
    const query960px = useMediaQuery({
        query: "(max-width: 960px)",
    });
    const query885px = useMediaQuery({
        query: "(max-width: 885px)",
    });
    const max = query885px
        ? 5
        : query960px
            ? 4
            : query1030px
                ? 5
                : query1175px
                    ? 4
                    : stories.length;

    return (
        <div className="stories">
            <div className="create_story_card">
                <img src="../../../images/default_pic.png" alt="" className="create_story_img" />
                <div className="plus_story">
                    <AiOutlinePlus style={{ color: "#fff" }} />
                </div>
                <div className="story_create_text">Create Story</div>
            </div>
            {
                stories?.slice(0, max).map((story, idx) => (
                    <Story story={story} key={idx} />
                ))
            }
            <div className="white_circle">
                <MdKeyboardArrowRight style={{ color: "#65676b", fontSize: "24px" }} />
            </div>
        </div>
    );
};

export default Stories;

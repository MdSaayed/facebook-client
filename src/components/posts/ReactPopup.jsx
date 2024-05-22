
import { useSelector } from "react-redux";
import { reactPost } from "../../functions/post";

const ReactPopup = ({ visible, setVisible, reacthandler}) => {
    const { user } = useSelector((state) => ({...state }));
    const reactsArray = [
        {
            name: "like",
            image: "../../../reacts/like.gif",
        },
        {
            name: "love",
            image: "../../../reacts/love.gif",
        },
        {
            name: "haha",
            image: "../../../reacts/haha.gif",
        },
        {
            name: "wow",
            image: "../../../reacts/wow.gif",
        },
        {
            name: "sad",
            image: "../../../reacts/sad.gif",
        },
        {
            name: "angry",
            image: "../../../reacts/angry.gif",
        },
    ];

   


    return (
        <>
            {visible && (
                < div className="reacts_popup" onMouseOver={() => setTimeout(() => { setVisible(true) }, 500)} onMouseLeave={() => setTimeout(() => { setVisible(false) }, 500)}>
                    {reactsArray.map((react, idx) => (
                        <div className="react" key={idx} onClick={() => reacthandler(react.name)}>
                            <img src={react.image} alt={react.name} />
                        </div>
                    ))}
                </ div>
            )
            }
        </>
    );
};

export default ReactPopup;

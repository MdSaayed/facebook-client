import { MdModeEdit } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { useState } from "react";
import Bio from "./Bio";


const Detail = ({ img, value, placeholder, name, handleChange, updateDetails, infos, text, rel }) => {
    const [show, setShow] = useState(false);


    return (
        <div>
            <div className="add_details_flex " onClick={() => setShow(true)}>
                {
                    value ? <div className="info_profile">
                        <img style={{ width: "15px" }} src={`../../../icons/${img}.png`} alt="" />
                        {value}
                        <MdModeEdit className="edit_icon" />
                    </div> : (
                        <>
                            <CiCirclePlus />
                            <span className="underline"> Add {text}</span>
                        </>)
                }
            </div>
            {show && <Bio
                placeholder={placeholder}
                name={name}
                handleChange={handleChange}
                updateDetails={updateDetails}
                infos={infos}
                detail
                setShow={setShow}
                rel={rel}
            />}
        </div>
    );
};

export default Detail;
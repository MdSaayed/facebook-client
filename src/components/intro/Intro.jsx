import React, { useEffect, useState } from "react";
import "./style.css";
import Bio from "./Bio";
import axios from "axios";
import { useSelector } from "react-redux";

const Intro = ({ detailss, visitor }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [details, setDetails] = useState({});
    useEffect(() => { setDetails(detailss) }, [detailss])

    const initial = {
        bio: details?.bio ? details.bio : " ",
        othername: details?.othername ? details.othername : "",
        job: details?.job ? details.job : " ",
        workplace: details?.workplace ? details.workplace : " ",
        highSchool: details?.highSchool ? details.highSchool : " ",
        college: details?.college ? details.college : " ",
        currentCity: details?.currentCity ? details.currentCity : " ",
        hometown: details?.hometown ? details.hometown : " ",
        relationship: details?.relationship ? details.relationship : " ",
        instagram: details?.instagram ? details.instagram : " ",
    };
    const [infos, setInfos] = useState(initial);
    const [showBio, setShowBio] = useState(false);
    const [max, setMax] = useState(infos?.bio ? 100 - infos.bio.length : 100);

    const handleBioChange = (e) => {
        setInfos({ ...infos, bio: e.target.value });
        setMax(100 - e.target.value.length);
    };

    // updateDetails
    const updateDetails = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8000/updateDetails`,
                { infos },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                }
            )
            setShowBio(false);
            setDetails(data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }





    return (
        <div className="profile_card">
            <div className="profile_card_header">Intro</div>
            {
                details?.bio && !showBio &&
                <div className="info_col">
                    <span className="info_text">{details?.bio}</span>
                    {!visitor && <button className="gray_btn hover1" onClick={() => setShowBio(true)}>Edit Bio</button>}
                </div>
            }
            {
                showBio && <Bio infos={infos} max={max} handleBioChange={handleBioChange} setShowBio={setShowBio} updateDetails={updateDetails} />
            }
            {
                details?.job && details?.workplace ? (
                    <div className="info_profile">
                        <img src="../../../icons/job.png" alt="" />
                        works as {details?.job} at <b>{details?.workplace}</b>
                    </div>
                ) : details?.job && !details?.workplace ? (
                    <div className="info_profile">
                        <img src="../../../icons/job.png" alt="" />
                        works as {details?.job}
                    </div>
                ) : details?.workplace && !details.job && (
                    <div className="info_profile">
                        <img src="../../../icons/job.png" alt="" />
                        works as {details?.workplace}
                    </div>
                )
            }
            {
                details?.relationship && (
                    <div className="info_profile">
                        <img style={{ width: "20px" }} src="../../../icons/relationship.png" alt="" />  {details?.relationship}
                    </div>
                )
            }
            {
                details?.college && (
                    <div className="info_profile">
                        <img src="../../../icons/studies.png" alt="" />
                        studied at {details?.college}
                    </div>
                )
            }
            {
                details?.highSchool && (
                    <div className="info_profile">
                        <img src="../../../icons/studies.png" alt="" />
                        studied at {details?.highSchool}
                    </div>
                )
            }
            {
                details?.currentCity && (
                    <div className="info_profile">
                        <img src="../../../icons/home.png" alt="" />
                        Lives in {details?.currentCity}
                    </div>
                )
            }
            {
                details?.hometown && (
                    <div className="info_profile">
                        <img src="../../../icons/home.png" alt="" />
                        From {details?.hometown}
                    </div>
                )
            }
            {
                details?.instagram && (
                    <div className="info_profile">
                        <img src="../../../icons/instagram.png" alt="" />
                        <a href={`https://www.instagram.com/${details?.instagram}`} target="_blank">
                            {details?.instagram}
                        </a>
                    </div>
                )
            }
            {!visitor && <button className="gray_btn hover1 w100">Edit Details</button>}
            {!visitor && <button className="gray_btn hover1 w100">Add Hobbies</button>}
            {!visitor && <button className="gray_btn hover1 w100">Add Featured</button>}
        </div>
    );
};

export default Intro;

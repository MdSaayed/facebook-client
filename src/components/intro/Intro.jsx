import React, { useEffect, useState } from "react";
import "./style.css";
import Bio from "./Bio";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";

const Intro = ({ detailss, visitor, setOthername }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [details, setDetails] = useState({});
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        setDetails(detailss);
        setInfos(detailss);
    }, [detailss]);

    const initial = {
        bio: details?.bio || "",
        otherName: details?.otherName || "",
        job: details?.job || "",
        workplace: details?.workplace || "",
        highSchool: details?.highSchool || "",
        college: details?.college || "",
        currentCity: details?.currentCity || "",
        hometown: details?.hometown || "",
        relationship: details?.relationship || "",
        instagram: details?.instagram || "",
    };
    const [infos, setInfos] = useState(initial);
    const [showBio, setShowBio] = useState(false);
    const [max, setMax] = useState(infos?.bio ? 100 - infos.bio.length : 100);


    // updateDetails
    const updateDetails = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8000/updateDetails`,
                { infos },
                {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    }
                }
            )
            setShowBio(false);
            setDetails(data);
            setOthername(data.otherName);
        } catch (error) {
            console.log(error?.response?.data?.message);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfos({ ...infos, [name]: value });
        setMax(100 - e.target.value.length);
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
                !details?.bio && !showBio && !visitor && (
                    <button className="gray_btn hover1 w100" onClick={() => setShowBio(true)}>Add Bio</button>
                )
            }
            {
                showBio && <Bio infos={infos} max={max} handleChange={handleChange} setShowBio={setShowBio} updateDetails={updateDetails} placeholder={"Add bio"} name="bio" />
            }
            {
                details?.job && details?.workplace && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/job.png" alt="" />
                        works as {details.job} at <b>{details.workplace}</b>
                    </div>
                )
            }
            {
                details?.job && !details?.workplace && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/job.png" alt="" />
                        works as {details.job}
                    </div>
                )
            }
            {
                details?.workplace && !details?.job && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/job.png" alt="" />
                        works at {details.workplace}
                    </div>
                )
            }
            {
                details?.relationship && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/relationship.png" alt="" />  {details.relationship}
                    </div>
                )
            }
            {
                details?.college && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/studies.png" alt="" />
                        studied at {details.college}
                    </div>
                )
            }
            {
                details?.highSchool && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/studies.png" alt="" />
                        studied at {details.highSchool}
                    </div>
                )
            }
            {
                details?.currentCity && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/home.png" alt="" />
                        Lives in {details.currentCity}
                    </div>
                )
            }
            {
                details?.hometown && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/home.png" alt="" />
                        From {details.hometown}
                    </div>
                )
            }
            {
                details?.instagram && (
                    <div className="info_profile">
                        <img style={{ width: "17px" }} src="../../../icons/instagram.png" alt="" />
                        <a href={`https://www.instagram.com/${details.instagram}`} target="_blank">
                            {details.instagram}
                        </a>
                    </div>
                )
            }
            {!visitor && <button className="gray_btn hover1 w100" onClick={() => setVisible(true)}>Edit Details</button>}
            {
                visible && !visitor && <EditDetails details={details} handleChange={handleChange} updateDetails={updateDetails} infos={infos} setVisible={setVisible} />
            }
            {!visitor && <button className="gray_btn hover1 w100">Add Hobbies</button>}
            {!visitor && <button className="gray_btn hover1 w100">Add Featured</button>}
        </div >
    );
};

export default Intro;

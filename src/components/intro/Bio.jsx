import Public from "../../../public/icons/svg/Public";

const Bio = ({ infos, handleBioChange, max, setShowBio, updateDetails }) => {
    return (
        <div className="add_bio_wrap">
            <textarea placeholder="Add bio" name="bio" value={infos?.bio} maxLength={"100"} className=" textarea_blue details_input" onChange={handleBioChange}></textarea><div className="remaining">{max} characters remaining</div>
            <div className="flex">
                <div className="flex flex_left">
                    <Public color="#828387" size="15px" />Public
                </div>
                <div className="flex flex_right">
                    <button className="gray_btn" onClick={() => setShowBio(false)}>Cancel</button>
                    <button className="blue_btn" onClick={() => updateDetails()}>Save</button>
                </div>
            </div>
        </div >
    );
};

export default Bio;
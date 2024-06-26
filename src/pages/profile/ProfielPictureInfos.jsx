import { useRef, useState } from "react";
import ProfilePicture from "../../components/profielPicture/ProfilePicture";
import Friendship from "./Friendship";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";


export default function ProfielPictureInfos({ profile, visitor, photos, othername, }) {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  const friendsCount = profile?.friends?.length || 0;




  return (
    <div className="profile_img_wrap">
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
          {!visitor && <div className="profile_circle hover1" onClick={() => setShow(true)}>
            <i className="fas fa-camera"></i>
          </div>}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile?.first_name} {profile?.last_name}
            <div className="othername">{othername && `(${othername})`}</div>
          </div>
          <div className="profile_friend_count">
            {
              friendsCount ? (
                <div className="profile_card_count">
                  {friendsCount === 0 ? "" : `${friendsCount} Friend${friendsCount > 1 ? "s" : ""}`}
                </div>
              ):""
            }
          </div>
          <div className="profile_friend_imgs">
            {profile?.friends &&
              profile?.friends.slice(0, 6).map((friend, idx) => (
                <Link to={`/profile/${friend?.username}`} key={idx} >
                  <img src={friend?.picture} alt={friend.name} style={{ transform: `translateX(${-idx * 7}px)`, zIndex: `${idx}` }} />

                </Link>
              ))
            }
          </div>

        </div>
      </div>
      {
        visitor ? <Friendship friendshipp={profile?.friendship} profileid={profile._id} /> : (
          <div className="profile_w_right">
            <div className="blue_btn">
              <img src="../../../icons/plus.png" alt="" className="invert" />
              <span>Add to story</span>
            </div>
            <div className="gray_btn">
              <MdEdit className="edit_icon"></MdEdit>
              <span>Edit profile</span>
            </div>
          </div>
        )
      }
    </div >
  );
}

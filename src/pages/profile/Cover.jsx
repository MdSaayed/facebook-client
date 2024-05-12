import { useRef, useState } from "react";
import useClickOutside from "../../helpers/useClickOutside";
import { faCamera, faUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




export default function Cover({ cover, visitor }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));


  return (
    <div className="profile_cover">
      {cover && <img src={cover} className="cover" alt="" />}
      {
        !visitor && (
          <div className="update_cover_wrapper">
            <div
              className="open_cover_update"
              onClick={() => setShowCoverMenu((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faCamera} className="camera_filled_icon" />
              Add Cover Photo
            </div>
            {showCoverMenu && (
              <div className="open_cover_menu" ref={menuRef}>
                <div className="open_cover_menu_item hover1">
                  <FontAwesomeIcon icon={faCheckCircle} className="select" />
                  Select Photo
                </div>
                <div className="open_cover_menu_item hover1">
                  <FontAwesomeIcon icon={faUpload} className="camera_filled_icon" />
                  Upload Photo
                </div>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}

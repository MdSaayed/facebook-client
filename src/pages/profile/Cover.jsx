import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../helpers/useClickOutside";
import { faCamera, faUpload, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import Public from '../../../public/icons/svg/Public';
import { uploadImages } from "../../functions/uploadImages";
import { useSelector } from "react-redux";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import OldCovers from "./OldCovers";




export default function Cover({ cover, visitor, photos }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const menuRef = useRef(null);
  const refInput = useState(null);
  const cRef = useState(null);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  useClickOutside(menuRef, () => setShowCoverMenu(false));

  // handle cover image
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 15) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };


  // cover image crooper
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const coverRef = useRef(null);
  const [width, setWidth] = useState();
  useEffect(() => {
    setWidth(coverRef.current.clientWidth)
  }, [window.innerWidth]);


  // update cover photo

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateCover(res[0].url, user.token);
      if (updated_picture === "ok") {
        const new_post = await createPost(
          "coverPicture",
          null,
          null,
          res,
          user.id,
          user.token
        );
        if (new_post === "ok") {
          setLoading(false);
          setCoverPicture("");
          cRef.current.src = res[0].url;


        } else {
          setLoading(false);

          setError(new_post);
        }
      } else {
        setLoading(false);

        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };







  return (
    <div className="profile_cover" ref={coverRef}>
      {
        coverPicture && <div className="save_changes_cover">
          <div className="save_changes_left">
            <Public color="#fff" size="15px" className="public_icon" />
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button className="blue_btn opacity_btn" onClick={() => setCoverPicture('')}>Cancel</button>
            <button className="blue_btn" onClick={() => updateCoverPicture()}>{loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}</button>
          </div>
        </div>
      }
      <input type="file" name="" id="" ref={refInput} hidden accept="image/jpeg,image/png,image/webp,image/gif" onChange={handleImage} />
      {error && (
        <div className="postError comment_error">
          <div className="postError_error">{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}

      {/* cover crooper */}
      {coverPicture && <div className="cover_crooper">
        <Cropper
          image={coverPicture}
          crop={crop}
          zoom={zoom}
          aspect={width / 350}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          showGrid={true}
          objectFit="horizontal-cover"
        />
      </div>}

      {cover && !coverPicture && < img src={cover} className="cover" alt="" ref={cRef} />}
      {!visitor && (
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
              <div className="open_cover_menu_item hover1" onClick={() => setShow(true)}>
                <FontAwesomeIcon icon={faCheckCircle} className="select" />
                Select Photo
              </div>
              <div className="open_cover_menu_item hover1" onClick={() => refInput.current.click()}>
                <FontAwesomeIcon icon={faUpload} className="camera_filled_icon" />
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )
      }
      {
        show && <OldCovers photos={photos} setCoverPicture={setCoverPicture} setShow={setShow} />
      }
    </div>
  );
}

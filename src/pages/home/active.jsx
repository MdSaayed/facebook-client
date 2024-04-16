import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import LeftHome from "../../components/home/left/Left";
import RightHome from "../../components/home/right/Right";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import Stories from "../../components/home/stories/Stories";
import CreatePost from "../../components/createPost/CreatePost";
import ActivateForm from "./ActivateForm";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";



const Activated = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useParams();
  useEffect(() => {
    activateAccount();
  }, []);
  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `http://localhost:8000/activate`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({
        type: "VERIFY",
        payload: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <div className="home">
      {success && <ActivateForm type="success" header="Account veification succeded." text={success} loading={loading} />}
      {error && <ActivateForm type="error" header="Account veification failed." text={error} loading={loading} />}
      <Header />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div >
      < RightHome user={user} />
    </div>
  );
};

export default Activated;

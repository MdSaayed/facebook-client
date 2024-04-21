import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer"
import ChangePassword from "./ChangePassword";

const Reset = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(0)
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState("");
    const [passwod, setPassword] = useState("");
    const [conf_password, setConf_password] = useState("");
    const [error, setError] = useState("");
    const [userInfos, setUserInfos] = useState("");

    // logout
    const logout = () => {
        Cookies.remove("user");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };


    return (
        <div className="reset">
            <div className="reset_header">
                <img src="../../icons/facebook.svg" alt="" />
                {user ? (
                    <>
                        <Link to="/login" className="right_reset">
                            <Link to={"/profile"}>
                                <img src={user.picture} alt="" />
                            </Link>
                            <button className="blue_btn" onClick={() => logout()}>Logout</button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="right_reset">
                            <button className="blue_btn">Login</button>
                        </Link>
                    </>
                )}
            </div>
            <div className="reset_wrap">
                {visible === 0 && <SearchAccount email={email} setEmail={setEmail} error={error} setError={setError} setLoading={setLoading} setUserInfos={setUserInfos} setVisible={setVisible} />}
                {visible === 1 && userInfos && <SendEmail email={email} userInfos={userInfos} error={error} setError={setError} setLoading={setLoading} setUserInfos={setUserInfos} setVisible={setVisible} />}
                {visible === 2 && <CodeVerification user={user} code={code} setCode={setCode} error={error} setError={setError} loading={loading} setLoading={setLoading} setVisible={setVisible} userInfos={userInfos} />}
                {visible === 3 && <ChangePassword passwod={passwod} conf_password={conf_password} setPassword={setPassword} setConf_password={setConf_password} error={error} setError={setError} loading={loading} setLoading={setLoading} setVisible={setVisible} userInfos={userInfos} />}
            </div>
            <Footer />
        </div >
    );
};

export default Reset;

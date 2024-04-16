import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";


const SendVerification = ({ user }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const sendVerificationLik = async () => {
        try {
            const { data } = await axios.post(`http://localhost:8000/sendVerification`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            setSuccess(data.message);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div className="send_verification">
            <span>Your account is not verified, verify your account before it gets deleted after a month from creating</span>
            <Link onClick={sendVerificationLik} className="verification_btn">click here to resend verificaion link</Link>
            {success && <div className="success_text">{success}</div>}
            {error && <div className="error_text">{error}</div>}
        </div >
    );
};

export default SendVerification;
import LoginInput from "../../components/inputs/loginInput/LoginInput";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ userInfos, error, setError, setLoading }) => {
    const navigate = useNavigate();

    const validatePassword = Yup.object({
        password: Yup.string()
            .required(
                "Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &)."
            )
            .min(6, "Password must be at least 6 characters.")
            .max(36, "Password can't be more than 36 characters"),

        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords must match."),
    });

    const changePassword = async (values) => {
        const { password } = values;
        const { email } = userInfos;

        try {
            setLoading(true);
            await axios.post(`http://localhost:8000/changePassword`, {
                email,
                password,
            });
            setError("");
            navigate("/");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="reset_form" style={{ height: "310px" }}>
            <div className="reset_form_header">Change Password</div>
            <div className="reset_form_text">Pick a strong password</div>
            <Formik
                initialValues={{
                    password: '',
                    conf_password: '',
                }}
                validationSchema={validatePassword}
                onSubmit={(values) => changePassword(values)}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="password"
                            name="password"
                            placeholder="New password"
                        />
                        <LoginInput
                            type="password"
                            name="conf_password"
                            placeholder="Confirm new password"
                            bottom
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn">
                                Cancel
                            </Link>
                            <button type="submit" className="blue_btn">
                                Continue
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ChangePassword;

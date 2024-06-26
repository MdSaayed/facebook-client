import LoginInput from "../../components/inputs/loginInput/LoginInput";
import { Formik } from "formik";
import { Form, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";


const CodeVerification = ({ code, setCode, error, setError, loading, setLoading, setVisible, userInfos }) => {
    const validateCode = Yup.object({
        code: Yup.string()
            .required("Code is required")
            .min("5", "Code must be 5 characters.")
            .max("5", "Code must be 5 characters."),
    });
    const { email } = userInfos;

    const verifyCode = async () => {
        try {
            setLoading(true);
            await axios.post(
                `http://localhost:8000/validateResetCode`,
                { email, code }
            );
            setVisible(3);
            setError("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };


    return (
        <div className="reset_form">
            <div className="reset_form_header">Code verification</div>
            <div className="reset_form_text">
                Please enter code that been sent to your email.
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    code,
                }}
                validationSchema={validateCode}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="code"
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Code"
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn">
                                Cancel
                            </Link>
                            <button onClick={() => verifyCode()} className="blue_btn">
                                Continue
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CodeVerification;
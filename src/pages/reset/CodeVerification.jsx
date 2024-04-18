import LoginInput from "../../components/inputs/loginInput/LoginInput";
import { Formik } from "formik";
import { Form, Link } from "react-router-dom";
import * as Yup from "yup";


const CodeVerification = ({ code, email, setCode, error }) => {
    const validateCode = Yup.object({
        code: Yup.string()
            .required("Code is required.")
            .min("5", "Code must be 5 caharacters.")
            .max("5", "Code must be 5 caharacters.")
    })

    return (
        <div className="reset_form">
            <div className="reset_form_header">Code Verificationt. </div>
            <div className="reset_form_text">Please enter code that been send to your email.</div>
            <Formik
                enableReinitialize
                initialValues={{ code }}
                validationSchema={validateCode}
            >
                {formik => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="code"
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Cdoe"
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn"> Cancel</Link>
                            <button type="submit" className="blue_btn">Continue</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CodeVerification;
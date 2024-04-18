import LoginInput from "../../components/inputs/loginInput/LoginInput";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const SearchAccount = ({ email, setEmail, error, setError, setLoading, setUserInfos, setVisible }) => {
    const validateEmail = Yup.object({
        email: Yup.string()
            .required("Email address is required.")
            .email("Must be a valid email address.")
            .max(50, "Email address can't be more than 50 characters.")
    });

    const handleSearch = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`http://localhost:8000/findUser`, { email });
            setUserInfos(data);
            setVisible(1);
            setError("");
        } catch (error) {
            setError(error.response ? error.response.data.message : "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset_form">
            <div className="reset_form_header">Find Your Account. </div>
            <div className="reset_form_text">Please enter your email address or mobile number to search for your account.</div>
            <Formik
                enableReinitialize
                initialValues={{ email }}
                validationSchema={validateEmail}
                onSubmit={() => {
                    handleSearch();
                }}
            >
                {formik => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address or phone number"
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn"> Cancel</Link>
                            <button type="submit" className="blue_btn">Search</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SearchAccount;

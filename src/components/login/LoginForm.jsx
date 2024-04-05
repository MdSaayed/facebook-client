import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput/LoginInput";
import { Link } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value }); // Fixed setting state
  };

  // validation
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email")
      .max(100),
    password: Yup.string().required("Password is required."),
  });

  // login function
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{ email, password }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  name="email" // Pass the name prop for Formik
                  type="text"
                  className="email"
                  placeholder="Email address or phone number"
                  onChange={handleLoginChange}
                />
                <LoginInput
                  name="password" // Pass the name prop for Formik
                  type="password"
                  className="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom
                />
                <button type="submit" className="blue_btn">
                  Log in
                </button>
              </Form>
            )}
          </Formik>
          <Link to={"/forgot"} className="forgot_password">
            Forgotten password
          </Link>
          <DotLoader
            color="#1876f2"
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {error && <div className="error_text">{error}</div>}
          <div className="sign_splitter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => setVisible(true)}
          >
            Create Account
          </button>
        </div>
        <Link to={"/"} className="sign_extra">
          <b>Create a page </b>
          for a celebrity, brand, or business.
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

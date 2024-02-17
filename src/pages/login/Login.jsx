import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import "./login.css";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput/LoginInput"; // Make sure this path is correct
import { GoPlus } from "react-icons/go";

import { useEffect, useState } from "react";

const loginInfos = {
  email: "",
  password: "",
};

const Login = () => {
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

  return (
    <div className="login">
      <div className="login_wrapper">
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
                enableReinitialize // Placed enableReinitialize here
                initialValues={{ email, password }} // Added missing closing curly brace
                validationSchema={loginValidation} // Fixed typo here
                onSubmit={(values) => {
                  console.log(values);
                  // Handle form submission here
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
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to={"/"} className="sign_extra">
              <b>Create a page </b>
              for a celebrity, brand, or business.
            </Link>
          </div>
        </div>
        <footer className="login_footer">
          <div className="login_footer_wrap">
            <Link>English (UK)</Link>
            <Link>বাংলা</Link>
            <Link>অসমীয়া</Link>
            <Link>हिन्दी</Link>
            <Link>Bahasa Indonesia</Link>
            <Link>नेपाली</Link>
            <Link>العربية</Link>
            <Link>中文(简体)</Link>
            <Link>Bahasa Melayu</Link>
            <Link>Português (Brasil)</Link>
            <Link>Español</Link>
            <Link className="footer_square">
              <GoPlus className="square" />
            </Link>
          </div>
          <div className="footer_splitter"></div>
          <div className="login_footer_wrap">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log in</Link>
            <Link to="/messenger">Messenger</Link>
            <Link to="/facebook-lite">Facebook Lite</Link>
            <Link to="/video">Video</Link>
            <Link to="/places">Places</Link>
            <Link to="/games">Games</Link>
            <Link to="/marketplace">Marketplace</Link>
            <Link to="/meta-pay">Meta Pay</Link>
            <Link to="/meta-store">Meta Store</Link>
            <Link to="/meta-quest">Meta Quest</Link>
            <Link to="/imagine-with-meta-ai">Imagine with Meta AI</Link>
            <Link to="/instagram">Instagram</Link>
            <Link to="/threads">Threads</Link>
            <Link to="/fundraisers">Fundraisers</Link>
            <Link to="/services">Services</Link>
            <Link to="/voting-information-centre">
              Voting Information Centre
            </Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/privacy-centre">Privacy Centre</Link>
            <Link to="/groups">Groups</Link>
            <Link to="/about">About</Link>
            <Link to="/create-ad">Create ad</Link>
            <Link to="/create-page">Create Page</Link>
            <Link to="/developers">Developers</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/ad-choices">AdChoices</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/help">Help</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/uploading-and-non-users">Uploading and non-users</Link>
            <Link to="/settings">Settings</Link>
          </div>
          <div className="login_footer_wrap">
            <Link style={{ fontSize: "12px", marginTop: "10px" }}>
              Meta © 2024
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;

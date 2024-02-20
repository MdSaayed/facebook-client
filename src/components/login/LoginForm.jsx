import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput/LoginInput";
import { Link } from "react-router-dom";

const loginInfos = {
  email: "",
  password: "",
};

const LoginForm = () => {
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
  );
};

export default LoginForm;

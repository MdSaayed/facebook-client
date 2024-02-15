import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
              Facebook helps you connect and share with the people in you life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik>
                {(formik) => (
                  <Form>
                    <input type="text" />
                    <input type="text" />
                    <button type="submit" className="blue_btn">Log in</button>
                  </Form>
                )}
              </Formik>
              <Link to={"/forgot"}>Forgotten password</Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to={"/"} className="sign_extra">
              <b>Create a page</b>
              fot a celerity, brand or business.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { Formik, Form } from "formik";
import { MdClose } from "react-icons/md";
import * as Yup from "yup";
import RegisterInput from "../inputs/registerInput/RegisterInput";
import { useState } from "react";
import DateOfBirthSelect from "../../pages/login/DateOfBirthSelect";
import GenderSelect from "../../pages/login/GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const dateTem = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, idx) => dateTem - idx);
  const months = Array.from(new Array(12), (val, idx) => 1 + idx);
  const getDayes = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDayes()), (val, idx) => 1 + idx);

  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[a-zA-Z]+$/, "Only letters are allowed in the first name."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters."),
  });

  const [dateErr, setDateErr] = useState("");
  const [genderErr, setGenderErr] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:8000";
  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth, // Ensure it's named correctly here
        bDay,
        gender,
      });
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <MdClose className="exit_icon" onClick={() => setVisible(false)} />
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThen70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateErr(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > noMoreThen70) {
              setDateErr(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateErr("");
              setGenderErr(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateErr("");
              setGenderErr("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder={"First name"}
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder={"Surname"}
                  name="last_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder={"Email address"}
                  name="email"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="password"
                  placeholder={"New password"}
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={days}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateErr={dateErr}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderErr={genderErr}
                />
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span> and{" "}
                <span>Cookie Policy.</span> You may receive SMS notifications
                from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button
                  type="submit"
                  className="blue_btn open_signup register_btn"
                >
                  Sign Up
                </button>
              </div>
              <DotLoader
                color="#1876f2"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;

import { useField, ErrorMessage } from "formik";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import "./register.css";

const RegisterInput = ({ placeholder, bottom, ...props }) => {
  const [field, meta] = useField(props);

  // Define desktopView inside the functional component
  const desktopView = useMediaQuery({
    query: "(min-width:850px)",
  });

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div
          className={
            desktopView ? "input_error input_error_desktop" : "input_error"
          }
          style={{ transform: "translateY(2px)" }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={desktopView ? "error_arrow_left" : "error_arrow_bottom"}
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        // Use desktopView here
        <MdOutlineErrorOutline
          className="error_icon" />
      )}
    </div>
  );
};

export default RegisterInput;

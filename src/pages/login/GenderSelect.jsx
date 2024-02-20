const GenderSelect = ({ handleRegisterChange, genderErr }) => {
  return (
    <div  style={{ marginBottom: genderErr ? "70px" : "" }} className="reg_grid">
      <label htmlFor="male">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value={"male"}
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="female">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value={"female"}
          onChange={handleRegisterChange}
        />
      </label>
      <label htmlFor="custom">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value={"custom"}
          onChange={handleRegisterChange}
        />
      </label>
      {genderErr && (
        <div className="input_error">
          <div className="error_arrow_bottom"></div>
          {genderErr}
        </div>
      )}
    </div>
  );
};

export default GenderSelect;

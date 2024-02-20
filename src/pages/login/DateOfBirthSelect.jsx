const DateOfBirthSelect = ({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleRegisterChange,
  dateErr,
}) => {
  return (
    <div style={{ marginBottom: dateErr ? "70px" : "" }} className={"reg_grid"}>
      <select
        name="bDay"
        id=""
        defaultValue={bDay}
        onChange={handleRegisterChange}
      >
        {days.map((day, i) => (
          <option value={day} key={i}>
            {day}
          </option>
        ))}
      </select>
      <select
        name="bMonth"
        id=""
        defaultValue={bMonth}
        onChange={handleRegisterChange}
      >
        {months.map((month, i) => (
          <option value={month} key={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="bYear"
        id=""
        defaultValue={bYear}
        onChange={handleRegisterChange}
      >
        {years.map((year, i) => (
          <option value={year} key={i}>
            {year}
          </option>
        ))}
      </select>
      {dateErr && (
        <div className="input_error">
          <div className="error_arrow_bottom"></div>
          <div className="">{dateErr}</div>
        </div>
      )}
    </div>
  );
};

export default DateOfBirthSelect;

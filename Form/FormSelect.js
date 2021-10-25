function FormSelect(props) {
  const { label, name, options, handleChange, firstOption, value } = props;

  return (
    <>
      <select
        className="w-full dark:bg-gray-800 bg-gray-50 dark:text-white text-dark border shadow-sm p-2"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
      >
        <option>{firstOption ? firstOption : `Select ${name}`}</option>
        {options.map((option) => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
      <label className="text-xs dark:text-white text-dark" htmlFor={name}>
        {label}
      </label>
    </>
  );
}
export default FormSelect;

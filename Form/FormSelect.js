function FormSelect(props) {
  const { label, name, options, handleChange, firstOption } = props;

  return (
    <>
      <select
        className="w-full bg-gray-800 text-white p-2"
        name={name}
        id={name}
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
      <label className="text-xs text-white" htmlFor={name}>
        {label}
      </label>
    </>
  );
}
export default FormSelect;

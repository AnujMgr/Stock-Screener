function FormInput(props) {
  const { label, type, name, value, onChange } = props;

  return (
    <div className="FormInput">
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <input
        type={type ? type : "text"}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

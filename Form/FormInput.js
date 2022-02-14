function FormInput(props) {
  const { label, type, name, value, onChange } = props;

  return (
    <div>
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <input type={type ? type : 'text'} name={name} value={value} onChange={onChange} />
    </div>
  );
}

export default FormInput;

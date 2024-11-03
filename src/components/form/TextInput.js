const TextInput = ({ label, placeholder, value, onChange, disabled }) => {
  return (
    <div className="flex column">
      <div className="text size-sm">{label}</div>
      <input className="text-input padding-xxs" type="text" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
};

export default TextInput;

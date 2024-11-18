const TextInput2 = ({ label, placeholder, value, onChange, disabled }) => {
  return (
      <input className="text-input2 padding-xxs" type="text" placeholder={placeholder} value={value} onChange={onChange} />
  );
};

export default TextInput2;

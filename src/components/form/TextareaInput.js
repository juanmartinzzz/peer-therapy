const TextareaInput = ({ label, placeholder, value, onChange, disabled, rows }) => {
  return (
    <div className="flex column">
      <div className="text size-sm">{label}</div>
      <textarea className="text-input padding-xxs" placeholder={placeholder} value={value} onChange={onChange} rows={rows} />
    </div>
  );
};

export default TextareaInput;

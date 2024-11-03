const DateInput = ({ label, value, onChange }) => {
  return (
    <div className="flex column">
      <div className="text size-sm">{label}</div>
      <input className="text-input padding-xxs" type="date" value={value} onChange={onChange} />
    </div>
  );
};

export default DateInput;

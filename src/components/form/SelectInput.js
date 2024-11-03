const SelectInput = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="flex column">
      <div className="text size-sm">{label}</div>
      <select className="text-input padding-xxs" value={value} onChange={onChange}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
};

export default SelectInput;
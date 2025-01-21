const Button = ({ children, onClick }) => {
  return (
    <div className="flex center">
      <div className="padding-sm action-element width-100" onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default Button;

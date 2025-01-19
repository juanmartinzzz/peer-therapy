const Button = ({text, textSize = 'md', children, onClick, additionalClasses}) => {
  return (
    <div className={`padding-top-bottom-xxs padding-left-right-sm rounded-xs background-secondary ${additionalClasses}`} onClick={onClick}>
      {text && <div className={`text bold center size-${textSize} color-grayscale-0`}>{text}</div>}
      {children}
    </div>
  )
};

export default Button;
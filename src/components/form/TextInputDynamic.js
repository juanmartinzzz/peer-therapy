import { useEffect, useRef } from "react";

const adjustTextareaHeight = ({textarea}) => {
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
}

const TextInputDynamic = ({textSize = 'xl', bold = false, label, placeholder, value, onChange, disabled}) => {
  const TextareaRef = useRef(null);

  useEffect(() => {
    // if(TextareaRef.current) {
      adjustTextareaHeight({textarea: TextareaRef.current});
    // }
  }, [value]);

  return (
    <textarea ref={TextareaRef} rows={1} className={`padding-xxs text size-${textSize} ${bold ? 'bold' : ''} width-100`} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} style={{border: "0"}} />
  );
}

export default TextInputDynamic;
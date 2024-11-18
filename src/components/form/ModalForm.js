import { useState } from "react";
import { modalFormPositions } from "../../data/enums";
import Button from "./Button";

const ModalForm = ({children, position = modalFormPositions.bottom, openButtonText, saveButtonText, onSave}) => {
  const [isOpen, setIsOpen] = useState(false);

  if(!isOpen) return (
    <div className="flex center padding-top-bottom-lg">
      <div className="flex center background-main" style={{position: 'fixed', bottom: "40px"}} onClick={() => {
        setIsOpen(true);
      }}>
        <Button>
          <div className="text size-xxl">{openButtonText}</div>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="modal-form-background">
      <div className={`modal-form-children ${position}`}>
        {children}

        <Button onClick={() => {
          onSave && onSave();
          setIsOpen(false);
        }}>{saveButtonText || 'Save and close'}</Button>
      </div>
    </div>
  );
}

export default ModalForm;
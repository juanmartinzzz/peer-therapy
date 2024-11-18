import Button from "./Button";
import { useEffect, useState } from "react";
import { modalFormPositions } from "../../data/enums";

const closeModal = ({setIsOpen, onClose}) => {
  setIsOpen(false);
  onClose && onClose();
};

const saveAndClose = ({setIsOpen, onSave}) => {
  onSave && onSave();
  setIsOpen(false);
};

const ModalForm = ({children, position = modalFormPositions.bottom, openButtonText, saveButtonText, onSave, onClose, shouldOpen = false}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(shouldOpen);
  }, [shouldOpen]);

  const CloseButton = ({setIsOpen}) => {
    return (
      <div className="flex space-between" onClick={() => closeModal({setIsOpen, onClose})}>
        <div></div>
        <div className="action-element padding-left-right-sm">x</div>
      </div>
    );
  };

  if(!isOpen) return (
    <div className="flex center padding-top-bottom-lg">
      <div className="flex center background-main" style={{position: 'fixed', bottom: "40px"}} onClick={() => setIsOpen(true)}>
        <Button>
          <div className="text size-xxl">{openButtonText}</div>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="modal-form-background">
      <div className={`modal-form-children ${position}`}>
        <CloseButton setIsOpen={setIsOpen} />

        {children}

        <Button onClick={() => saveAndClose({setIsOpen, onSave})}>{saveButtonText || 'Save and close'}</Button>
      </div>
    </div>
  );
}

export default ModalForm;
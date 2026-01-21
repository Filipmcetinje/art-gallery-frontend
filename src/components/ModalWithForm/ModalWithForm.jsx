import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close.svg";

function ModalWithForm({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button type="button" className="modal__close" onClick={onClose}>
          <img className="modal__close-icon" src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">{title}</h2>

        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;

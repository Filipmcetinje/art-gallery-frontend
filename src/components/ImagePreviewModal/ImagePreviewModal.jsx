import { useEffect } from "react";
import "./ImagePreviewModal.css";

import closeIcon from "../../assets/images/close.svg";

function ImagePreviewModal({ artwork, onClose }) {
  useEffect(() => {
    if (!artwork) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [artwork, onClose]);

  if (!artwork) return null;

  const handleOverlayClick = () => onClose();
  const stopClick = (e) => e.stopPropagation();

  return (
    <div className="preview-modal" onClick={handleOverlayClick}>
      <div className="preview-modal__content" onClick={stopClick}>
        <button
          type="button"
          className="preview-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <img
            className="preview-modal__close-icon"
            src={closeIcon}
            alt="Close"
          />
        </button>

        <img
          className="preview-modal__image"
          src={artwork.primaryImageSmall}
          alt={artwork.title}
        />

        <h2 className="preview-modal__title">{artwork.title}</h2>
        <p className="preview-modal__artist">
          {artwork.artistDisplayName || "Unknown artist"}
        </p>
      </div>
    </div>
  );
}

export default ImagePreviewModal;

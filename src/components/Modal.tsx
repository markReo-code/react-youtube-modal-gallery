import type { ReactNode, MouseEvent } from "react";
import useScrollLock from "../_hooks/useScrollLock";
import useEscapeKey from "../_hooks/useEscapeKey";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useScrollLock(isOpen);
  useEscapeKey({onEscape: onClose, enabled: isOpen})

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className={`modal ${isOpen ? "is-open" : ""}`}
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal__content">
          <button
            type="button"
            className="modal__close-button"
            onClick={onClose}
            aria-label="動画を閉じる"
          >
            <img 
              src="./icon_modal_close.svg"
              className="modal__close-icon"
              alt="" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

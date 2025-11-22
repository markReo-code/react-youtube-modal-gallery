import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";
import useScrollLock from "../_hooks/useScrollLock";
import useFocusTrap from "../_hooks/useFocusTrap";
import useEscapeKey from "../_hooks/useEscapeKey";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useScrollLock(isOpen);
  useFocusTrap({ ref: modalRef, isActive: isOpen});
  useEscapeKey({onEscape: onClose, enabled: isOpen})

  if (!isOpen) return null;

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="modal-overlay"
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-content" ref={modalRef}>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="動画を閉じる"
          >
            <img src="./modal_arrow.svg" alt="" />
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

import { useEffect, type RefObject } from "react";

type FocusTrapOptions<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  isActive: boolean;
};

const useFocusTrap = <T extends HTMLElement>({
     ref,
     isActive,
}: FocusTrapOptions<T>) => {

  useEffect(() => {
    const root = ref.current;
    if (!isActive || !root) return;

    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "textarea:not([disabled])",
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ];

    const focusableElements = root.querySelectorAll<HTMLElement>(
        focusableSelectors.join(', ')
    )

    if (focusableElements.length === 0) return;
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length -1];

    // モーダルを開いた瞬間、モーダル内にフォーカスを移す
    if (!root.contains(document.activeElement)) {
        firstEl.focus();
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
        }
    }

    document.addEventListener("keydown", handleFocusTrap);
    return () => {
        document.removeEventListener("keydown", handleFocusTrap);
    }

  }, [ref, isActive]);
};

export default useFocusTrap;

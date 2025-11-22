import { useEffect } from "react";

type EscapeKeyOptions = {
  onEscape: () => void;
  enabled: boolean;
};

const useEscapeKey = ({ onEscape, enabled }: EscapeKeyOptions) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onEscape]);
};

export default useEscapeKey;

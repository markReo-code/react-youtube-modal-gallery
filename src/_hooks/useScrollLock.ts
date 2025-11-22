import { useEffect, useRef } from "react";

const isIOSUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS =
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    (ua.includes("macintosh") && "ontouchend" in document);

  return isIOS;
};

const useScrollLock = (isLocked: boolean) => {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isLocked) return;

    const body = document.body;
    const html = document.documentElement; //Safari対応
    const IOS = isIOSUserAgent();

    scrollYRef.current = window.pageYOffset;

    if (IOS) {
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
    } else {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }

    return () => {
      if (IOS) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        body.style.removeProperty("left");
        body.style.removeProperty("right");
        body.style.removeProperty("width");
        window.scrollTo(0, scrollYRef.current);
      } else {
        body.style.removeProperty("overflow");
        html.style.removeProperty("overflow");
      }
    };

  }, [isLocked]);
};

export default useScrollLock;

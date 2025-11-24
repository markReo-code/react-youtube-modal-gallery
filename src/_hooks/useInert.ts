import { useEffect, type RefObject } from "react"

type InertOptions = {
    ref: RefObject<HTMLElement | null>;
    active: boolean;
}

const useInert = ({ref, active}: InertOptions) => {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        
        el.inert = active;
        return () => {
            el.inert = false;
        }

    },[ref, active])
}

export default useInert;

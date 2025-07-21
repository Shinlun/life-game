import type { RefObject } from "react";
import { useEffect } from "react";

export const useClickOutside = (
	ref: RefObject<HTMLElement | null>,
	handler: () => void,
	ignoreRefs?: RefObject<HTMLElement | null>[]
) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target instanceof Element &&
				!ref.current.contains(event.target) &&
				!ignoreRefs?.some((ignoreRef) =>
					ignoreRef.current?.contains(event.target as Node)
				)
			) {
				handler();
			}
		};
		document.body.addEventListener("click", handleClick);
		return () => document.body.removeEventListener("click", handleClick);
	}, [ref, handler]);
};

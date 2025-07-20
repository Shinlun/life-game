import { useState } from "react";

export default function useLocalStorage<T>(
	key: string,
	defaultValue?: T
): [
	T | undefined,
	(value: T | ((currentValue: T | undefined) => T)) => void,
	() => void
] {
	const [localStorageValue, setLocalStorageValue] = useState<T | undefined>(
		() => {
			const storedValue = localStorage.getItem(key);

			return storedValue ? (JSON.parse(storedValue) as T) : defaultValue;
		}
	);

	const setValue = (value: T | ((currentValue: T | undefined) => T)) => {
		const newValue =
			typeof value === "function"
				? (value as (currentValue: T | undefined) => T)(localStorageValue)
				: value;

		localStorage.setItem(key, JSON.stringify(newValue));
		setLocalStorageValue(newValue);
	};

	const resetValue = () => {
		localStorage.removeItem(key);
		setLocalStorageValue(undefined);
	};

	return [localStorageValue, setValue, resetValue];
}

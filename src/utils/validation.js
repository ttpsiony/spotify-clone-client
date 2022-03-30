import { useState, useRef } from 'react';

export const isEmpty = (value) => value === undefined || value === null || value === '';

export const required = (errorMsg = '此欄位必填。') => {
	return (value) => {
		if (isEmpty(value)) {
			return errorMsg;
		}
	};
};

export const email = (value) => {
	if (!isEmpty(value) && typeof value === 'string') {
		const isValid = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(
			value,
		);

		if (!isValid) {
			return '請輸入正確的電子信箱地址。';
		}
	}
};

export const useField = (validate = []) => {
	const inputRef = useRef(null);
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);
	const [error, setError] = useState('');

	const validation = (currentValue) => {
		if (!Array.isArray(validate)) return '';
		let error = '';

		for (let i = 0; i < validate.length; i++) {
			const fns = validate[i] || null;
			if (typeof fns === 'function') {
				const execFns = fns(currentValue);

				error =
					typeof execFns === 'function'
						? execFns(currentValue)
						: typeof execFns === 'string'
						? execFns
						: '';

				if (error) break;
				error = '';
				continue;
			}
		}

		return error;
	};

	const onChange = (e) => {
		const currentValue = typeof e === 'string' ? e : e?.target?.value || '';
		let error = '';

		if (touched) {
			error = validation(currentValue);
		}

		setError(error);
		setValue(currentValue);
	};

	const onBlur = (e) => {
		const currentValue = typeof e === 'string' ? e : e?.target?.value || '';
		const error = validation(currentValue);

		setTouched(true);
		setError(error);
	};

	const onFocus = (e) => {
		e?.target?.focus();
		inputRef?.current?.target?.focus();
	};

	return { ref: inputRef, input: { value, onBlur, onFocus, onChange }, meta: { touched, error } };
};

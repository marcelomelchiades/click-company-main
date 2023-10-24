import internal from 'events';
import React, { ReactNode } from 'react';
//  pattern="\d*" maxlength="4"
type InputProps = {
	type: string;
	name: string;
	value?: string | number | string[];
	required?: boolean;
	disabled?: boolean;
	onChange?: any;
	label?: string;
	placeholder?: string;
	multiple?: boolean;
	maxlength?: number;
	descricaoCampo?: ReactNode;
	pattern?: string;
	valueSelect?: {
		label: string;
		value: string;
	}[];
	className?: string;
	onKeyPress?: any;
};

const Input: React.FC<InputProps> = ({
	type,
	name,
	value,
	required,
	disabled,
	onChange,
	label,
	placeholder,
	multiple,
	maxlength,
	pattern,
	descricaoCampo,
	valueSelect,
	className,
	onKeyPress,
}) => {
	const elLabel =
		label !== '' ? (
			<label htmlFor={name} className={'label-campo'}>
				{label}
			</label>
		) : null;

	let elInput = (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			id={name}
			maxLength={maxlength}
			pattern={pattern}
			className={'form-input'}
			placeholder={placeholder}
			required={required}
			disabled={disabled}
			onKeyPress={onKeyPress}
		/>
	);

	if (type === 'textarea') {
		elInput = (
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				id={name}
				rows={6}
				className={'form-textarea'}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				onKeyPress={onKeyPress}
			/>
		);
	} else if (type === 'select') {
		let optionsSelect = null;
		if (valueSelect !== undefined) {
			optionsSelect = valueSelect.map(select => {
				return (
					<option
						value={select.value}
						selected={
							select.value === value ||
							select.label === value ||
							(multiple && (value as string[])?.includes(select.value))
						}
					>
						{select.label}
					</option>
				);
			});
		}

		elInput = (
			<select
				name={name}
				id={name}
				className={multiple ? `form-input height-select` : 'form-input'}
				multiple={multiple}
				onChange={onChange}
				required={required}
				disabled={disabled}
			>
				<option value="">{placeholder}</option>
				{optionsSelect}
			</select>
		);
	}

	return (
		<div className={`bloco-campo ${className}`}>
			<div className="block">
				{elLabel}
				{elInput}
			</div>
			<div className="descricao-campo">{descricaoCampo}</div>
		</div>
	);
};

Input.defaultProps = {
	value: '',
	required: false,
	disabled: false,
	onChange: () => undefined,
	label: '',
	placeholder: '',
	multiple: false,
	descricaoCampo: '',
	valueSelect: [],
	className: '',
	onKeyPress: () => undefined,
};

export default Input;

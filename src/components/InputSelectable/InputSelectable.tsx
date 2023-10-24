import React from 'react';

import CreatableSelect from 'react-select/creatable';

type InputProps = {
	name: string;
	label?: string;
	placeholder?: string;
	inputValueSelect?: string;
	valueSelect?: any;
	onChange?: any;
	onKeyDown?: any;
	onClickAddElement?: any;
};

const InputSelectable: React.FC<InputProps> = ({
	name,
	label,
	placeholder,
	inputValueSelect,
	valueSelect,
	onChange,
	onKeyDown,
	onClickAddElement,
}) => {
	const elLabel =
		label !== '' ? (
			<label htmlFor={name} className={'label-campo'}>
				{label}
			</label>
		) : null;

	const elInput = (
		<input
			type={'text'}
			name={name}
			id={name}
			value={inputValueSelect}
			className={'form-input'}
			placeholder={placeholder}
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	);

	return (
		<div className="bloco-campo-selectable">
			<div className="flex mb-1">
				{elLabel}
				<div className="flex flex-row w-full">
					<button
						type="button"
						onClick={onClickAddElement}
						name={name}
						className="flex items-center rounded rounded-r-none border-0 pr-3 text-color-FF4767"
					>
						<i className="fas fa-plus" />
					</button>
					{elInput}
				</div>
			</div>
			{valueSelect !== undefined && valueSelect.length > 0 ? (
				<CreatableSelect
					components={{
						DropdownIndicator: () => null,
						IndicatorSeparator: () => null,
					}}
					isClearable={false}
					isMulti
					onChange={onChange}
					onKeyDown={onKeyDown}
					className={'campo-selected-options'}
					menuIsOpen={false}
					placeholder={''}
					value={valueSelect}
					name={name}
				/>
			) : null}
		</div>
	);
};

export default InputSelectable;

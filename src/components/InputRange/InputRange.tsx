import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';

interface inputRangeProps {
	rtl: boolean;
	toFixed: number;
	step: number;
	min: number;
	max: number;
	values: number[];
	setValues: React.Dispatch<React.SetStateAction<number[]>>;
	strSuffixValue?: string;
	strPrefixValue?: string;
}

const InputRange: React.FC<inputRangeProps> = ({
	rtl,
	toFixed,
	step,
	min,
	max,
	values,
	setValues,
	strSuffixValue = '',
	strPrefixValue = '',
}) => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
			}}
		>
			<Range
				values={values}
				step={step}
				min={min}
				max={max}
				rtl={rtl}
				onChange={valuesSet => setValues(valuesSet)}
				renderTrack={({ props, children }) => (
					// eslint-disable-next-line jsx-a11y/no-static-element-interactions
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{
							...props.style,
							height: '16px',
							display: 'flex',
							width: '100%',
						}}
					>
						<div
							ref={props.ref}
							style={{
								height: '4px',
								width: '100%',
								borderRadius: '4px',
								background: getTrackBackground({
									values,
									colors: ['#ff4767', '#ccc'],
									min,
									max,
									rtl,
								}),
								alignSelf: 'center',
							}}
						>
							{children}
						</div>
					</div>
				)}
				renderThumb={({ props, isDragged }) => (
					<div
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...props}
						style={{
							...props.style,
							height: '16px',
							width: '16px',
							borderRadius: '999px',
							backgroundColor: '#FFF',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '0px 2px 6px #AAA',
						}}
					>
						<div
							style={{
								height: '6px',
								width: '3px',
								borderRadius: '3px',
								backgroundColor: isDragged ? '#ff4767' : '#CCC',
							}}
						/>
					</div>
				)}
			/>
			<output style={{ marginTop: '10px' }}>
				{`${strPrefixValue} ${values[0]
					.toFixed(toFixed)
					.replace('.', ',')} ${strSuffixValue}`}
			</output>
		</div>
	);
};

InputRange.defaultProps = {
	strSuffixValue: '',
	strPrefixValue: '',
};

export default InputRange;

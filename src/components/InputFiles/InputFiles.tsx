import React from 'react';
import logoVermelho from '../../assets/images/logo-vermelho-clickcompany.svg';

type InputProps = {
	name: string;
	accept?: string;
	label?: string;
	valueFiles?: {
		id?: string;
		label: string;
		value: string;
		urlThumbnail: string;
	}[];
	onChange?: any;
	onClickAddFile?: any;
	onClickRemoveFile?: any;
	hasRemove?: boolean;
	isMutiple?: boolean;
	classesBtn?: string;
	previewFileClasses?: string;
	numberCols?: number;
};

const Input: React.FC<InputProps> = ({
	name,
	accept,
	label,
	valueFiles,
	onChange,
	onClickAddFile,
	onClickRemoveFile,
	hasRemove,
	isMutiple = true,
	classesBtn = 'campo-file',
	previewFileClasses = 'campo-file',
	numberCols = 3,
}) => {
	const elLabel =
		label !== '' ? (
			<label htmlFor={name} className={'label-campo-files block mb-3'}>
				{label}
			</label>
		) : null;

	return (
		<div className="bloco-campo-files">
			<div className="block">
				{elLabel}
				<input
					name={name}
					type="file"
					multiple={isMutiple}
					id={name}
					onChange={onChange}
					className={'hidden'}
					accept={accept}
				/>
				<div
					className={`bloco-adiciona-files grid grid-cols-${numberCols} gap-4 text-color-FF4767`}
				>
					{valueFiles?.map((value) => {
						let elPreviewFile = <img src={value.urlThumbnail} alt="" />;
						const preload = (value.id != null) ? 'auto' : 'none';
						if (accept === 'video/*') {
							elPreviewFile = (
								<video 
									src={value.urlThumbnail}
									preload={preload}
									poster={logoVermelho}
									controls
									playsInline
								>
									<track src={value.urlThumbnail} kind="captions" />
								</video>
							);
						}
						return (
							<div className={previewFileClasses}>
								{elPreviewFile}
								{hasRemove && (
									<button
										style={{
											position: 'absolute',
											top: '3px',
											right: '3px',
											width: '30px',
											height: '30px',
											backgroundColor: 'rgba(0, 0, 0, 0.5)',
											borderRadius: 3,
										}}
										type="button"
										onClick={() => onClickRemoveFile(value)}
									>
										<i className="fa fa-trash" />
									</button>
								)}
							</div>
						);
					})}
					<button className={classesBtn} type="button" onClick={onClickAddFile}>
						<i className="fas fa-plus" />
					</button>
				</div>
			</div>
		</div>
	);
};

Input.defaultProps = {
	accept: '',
	label: '',
	valueFiles: [],
	onChange: () => undefined,
	onClickAddFile: () => undefined,
	onClickRemoveFile: () => undefined,
	hasRemove: false,
	isMutiple: true,
	classesBtn: 'campo-file',
	previewFileClasses: 'campo-file',
	numberCols: 3,
};

export default Input;

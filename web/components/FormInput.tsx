'use client';
import { memo, useState } from 'react';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

interface Props {
	type?: string;
	label?: string;
	inputClassName?: string;
	labelClassName?: string;
	placeholder?: string;
	updateState(newValue: string | undefined): void;
	currentState?: string;
}
const FormInput = memo(function FormInput(props: Props) {
	const [isVisible, setIsVisible] = useState(false);
	return (
		<div className='flex justify-start flex-col gap-2 w-full'>
			<label
				htmlFor='label'
				className={`text-sm md:text-base ${props.labelClassName}`}
			>
				{props.label}
			</label>
			<div className='relative'>
				<input
					type={isVisible ? 'text' : props.type}
					required
					placeholder={props.placeholder}
					className={
						'relative w-full py-2 px-[18px] rounded-xl border border-black font-normal text-sm md:text-base outline-1 ' +
						props.inputClassName
					}
					value={props.currentState}
					onChange={(e) => props.updateState(e.target.value)}
				/>
				{props.type == 'password' && (
					<span className='absolute right-2 top-1/2 -translate-y-1/2'>
						{isVisible && (
							<IoIosEyeOff
								className='text-2xl cursor-pointer opacity-50'
								onClick={() => setIsVisible(false)}
							/>
						)}
						{!isVisible && (
							<IoIosEye
								className='text-2xl cursor-pointer opacity-50'
								onClick={() => setIsVisible(true)}
							/>
						)}
					</span>
				)}
			</div>
		</div>
	);
});
export default FormInput;

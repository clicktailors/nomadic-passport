import React from "react";
import {
	formatPhoneNumber,
	formatAddress,
	formatAddress2,
	formatCity,
	formatState,
	formatZip,
} from "../../../../utils/formatters";
import { LOGGING } from "../../../../lib/logging";

const sharedClasses = `w-full p-2 mb-1 text-base placeholder:text-base-content/50`;
const inputClasses = "input input-bordered p-4 py-6";
const textareaClasses = "textarea textarea-bordered h-48";

export interface FieldType {
	label: string;
	type: string;
	name: string;
	placeholder: string;
	options?: string[];
	required?: boolean;
}

interface FieldProps extends FieldType {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
}

const Field: React.FC<FieldProps> = ({
	type,
	name,
	label,
	placeholder,
	value,
	onChange,
	options,
	error,
	required,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			target: { name, value: e.target.value },
		} as React.ChangeEvent<HTMLInputElement>);
	};

	const renderField = () => {
		LOGGING && console.log(type);
		if (type === "textarea") {
			return (
				<textarea
					name={name}
					className={`${sharedClasses} ${textareaClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
						onChange({
							target: { name, value: e.target.value },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "firstName") {
			return (
				<input
					type="text"
					autoComplete="given-name"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
			);
		} else if (type === "lastName") {
			return (
				<input
					type="text"
					autoComplete="family-name"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
			);
		} else if (type === "tel") {
			return (
				<input
					type="tel"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						const formattedValue = formatPhoneNumber(
							e.target.value
						);
						onChange({
							target: { name, value: formattedValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "address") {
			return (
				<input
					type="text"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						const newValue = e.target.value;
						onChange({
							target: { name, value: newValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
					onBlur={() => {
						const formattedValue = formatAddress(value);
						onChange({
							target: { name, value: formattedValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "address2") {
			return (
				<input
					type="text"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						const newValue = e.target.value;
						onChange({
							target: { name, value: newValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
					onBlur={() => {
						const formattedValue = formatAddress2(value);
						onChange({
							target: { name, value: formattedValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "city") {
			return (
				<input
					type="text"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						const newValue = e.target.value;
						onChange({
							target: { name, value: newValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
					onBlur={() => {
						const formattedValue = formatCity(value);
						onChange({
							target: { name, value: formattedValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "state") {
			return (
				<input
					type="text"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						const newValue = e.target.value;
						onChange({
							target: { name, value: newValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
					onBlur={() => {
						const formattedValue = formatState(value);
						onChange({
							target: { name, value: formattedValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "zip") {
			return (
				<input
					type="text"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						const newValue = e.target.value;
						onChange({
							target: { name, value: newValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
					onBlur={() => {
						const formattedValue = formatZip(value);
						onChange({
							target: { name, value: formattedValue },
						} as React.ChangeEvent<HTMLInputElement>);
					}}
				/>
			);
		} else if (type === "email") {
			return (
				<input
					type="email"
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
			);
		} else if (type === "dropdown" && options) {
			return (
				<select
					name={name}
					className={`select select-bordered w-full ${
						value ? "" : `${inputClasses} ${sharedClasses}`
					}`}
					value={value}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						handleChange(
							e as unknown as React.ChangeEvent<HTMLInputElement>
						)
					}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			);
		} else if (type === "date") {
			return (
				<input
					type="date"
					name={name}
					className={`${sharedClasses} ${inputClasses} cursor-pointer`}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
			);
		} else if (type === "weekdays") {
			const days = [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			];
			const selectedDays = value ? JSON.parse(value) : {};

			const handleDayChange = (day: string) => {
				const newSelectedDays = {
					...selectedDays,
					[day]: !selectedDays[day],
				};
				onChange({
					target: { name, value: JSON.stringify(newSelectedDays) },
				} as React.ChangeEvent<HTMLInputElement>);
			};

			return (
				<div className={`form-control ${sharedClasses}`}>
					{days.map((day) => (
						<label
							key={day}
							className="cursor-pointer label justify-start"
						>
							<input
								type="checkbox"
								className="checkbox checkbox-primary mr-2"
								checked={selectedDays[day] || false}
								onChange={() => handleDayChange(day)}
							/>
							<span className={`label-text text-base-content/80`}>
								{day}
							</span>
						</label>
					))}
				</div>
			);
		} else if (type === "timeOfDay") {
			const timeOptions = ["Any", "Morning", "Afternoon", "Evening"];
			const selectedTimes = value ? JSON.parse(value) : {};

			const handleTimeChange = (time: string) => {
				let newSelectedTimes = { ...selectedTimes };

				if (time === "Any") {
					// If "Any" is selected, deselect all other options
					newSelectedTimes = { Any: !selectedTimes.Any };
				} else {
					// If any other option is selected, deselect "Any"
					newSelectedTimes = {
						...newSelectedTimes,
						[time]: !selectedTimes[time],
						Any: false,
					};
				}

				onChange({
					target: { name, value: JSON.stringify(newSelectedTimes) },
				} as React.ChangeEvent<HTMLInputElement>);
			};

			return (
				<div className={`form-control ${sharedClasses}`}>
					{timeOptions.map((time) => (
						<label
							key={time}
							className="cursor-pointer label justify-start"
						>
							<input
								type="checkbox"
								className="checkbox checkbox-primary mr-2"
								checked={selectedTimes[time] || false}
								onChange={() => handleTimeChange(time)}
							/>
							<span className={`label-text text-base-content/80`}>
								{time}
							</span>
						</label>
					))}
				</div>
			);
		} else {
			return (
				<input
					type={type}
					name={name}
					className={`${sharedClasses} ${inputClasses}`}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
				/>
			);
		}
	};

	return (
		<div className="form-control w-full">
			<label className="label p-0 my-1">
				<span className="label-text text-base-content/80">
					{label}{" "}
					{required && <span className="text-red-500">*</span>}
				</span>
			</label>
			{renderField()}
			{error && <p className="text-error text-sm mt-1">{error}</p>}
		</div>
	);
};

export default Field;

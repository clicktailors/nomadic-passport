import React from "react";
import Field, { FieldType } from "./Field";
import { FormErrors } from "../../../../utils/formValidation";

const categoryContainerClasses = "";
const categoryTitleClasses = "text-2xl font-bold mb-8 text-center";

interface CategoryProps {
	category?: string;
	fields: FieldType[];
	formData: any;
	onChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => void;
	errors: FormErrors;
}

const Category: React.FC<CategoryProps> = ({
	category,
	fields,
	formData,
	onChange,
	errors,
}) => (
	<div className={categoryContainerClasses}>
		{category && <h2 className={categoryTitleClasses}>{category}</h2>}
		{fields.map((field) => (
			<div key={field.name}>
				<Field
					{...field}
					value={formData[field.name] || ""}
					onChange={onChange}
					error={errors[field.name]}
				/>
			</div>
		))}
	</div>
);

export default Category;

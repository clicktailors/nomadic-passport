export const formatPhoneNumber = (value: string) => {
	const phoneNumber = value.replace(/\D/g, "");
	const phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength <= 3) return phoneNumber;
	if (phoneNumberLength <= 6)
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
		3,
		6
	)}-${phoneNumber.slice(6, 10)}`;
};

export const formatAddress = (value: string) => {
	const trimmedValue = value ? value.trim() : "";
	const addressComponents = trimmedValue
		.split(",")
		.map((component) => component.trim());
	const formattedComponents = addressComponents.map((component) =>
		component
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ")
	);
	return formattedComponents.join(", ");
};

export const formatAddress2 = (value: string) => {
	return value
		? value
			.trim()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ")
		: "";
};

export const formatCity = (value: string) => {
	return value.trim().charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const formatState = (value: string) => {
	return value.trim().toUpperCase();
};

export const formatZip = (value: string) => {
	const trimmedValue = value.trim();
	const zipRegex = /^\d{5}(-\d{4})?$/;
	return zipRegex.test(trimmedValue) ? trimmedValue : "";
};

export function convertToId(title: string) {
	return title.toLowerCase().replace(/\s+/g, "-");
}
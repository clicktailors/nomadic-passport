import React from "react";

interface CustomErrorPageProps {
	statusCode: number;
}

const CustomErrorPage: React.FC<CustomErrorPageProps> = ({
	statusCode,
}: CustomErrorPageProps) => {
	return <div>Error: {statusCode}</div>;
};

export default CustomErrorPage;

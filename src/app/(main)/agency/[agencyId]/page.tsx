import * as React from 'react';

interface Props {
	params: {
		agencyId: string;
	}
}

const Page: React.FC<Props> = ({
	params
}) => {
	return (
		<div>
			{params.agencyId}
		</div>
	);
};

export default Page;
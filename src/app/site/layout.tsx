import React, { PropsWithChildren } from 'react';
import Navigation from "@/components/site/navigation";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
	return (
		<main className={'h-full'}>
			<Navigation />
			{children}
		</main>
	);
};

export default Layout;
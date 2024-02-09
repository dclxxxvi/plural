import React, { PropsWithChildren } from 'react';
import { dark } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
	return (
		<ClerkProvider
			appearance={{baseTheme: dark}}
		>
			{children}
		</ClerkProvider>
	);
};

export default Layout;
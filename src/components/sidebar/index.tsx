import * as React from 'react';
import { getAuthUserDetails } from "@/lib/queries";
import MenuOptions from "@/components/sidebar/menu-options";

interface Props {
	id: string;
	type: 'agency' | 'subaccount';
}

const Sidebar: React.FC<Props> = async ({id, type}) => {
	const user = await getAuthUserDetails();
	if (!user) {
		return null;
	}

	if (!user.Agency) {
		return null;
	}

	const details = type === "agency"
		? user?.Agency
		: user?.Agency?.SubAccount.find((subaccount) => subaccount.id === id);

	const isWhiteLabeledAgency = user.Agency.whiteLabel;

	if (!details) return null;

	let sideBarLogo = user.Agency.agencyLogo || 'assets/plura-logo.svg';

	if (!isWhiteLabeledAgency) {
		if (type === 'subaccount') {
			sideBarLogo = user?.Agency.SubAccount.find((subaccount) => subaccount.id === id)
				?.subAccountLogo
				|| user.Agency.agencyLogo;
		}
	}

	const sidebarOpt = type === 'agency'
		? user.Agency.SidebarOption || []
		: user.Agency.SubAccount.find((subaccount) => subaccount.id === id)
			?.SidebarOption || [];

	const subaccounts = user.Agency.SubAccount
		.filter((subaccount) => user.Permissions
			.find((permission) => permission.subAccountId === subaccount.id && permission.access)
		);

	console.log(sidebarOpt)

	return (
		<>
			<MenuOptions
				defaultOpen={true}
				details={details}
				id={id}
				sidebarLogo={sideBarLogo}
				sidebarOpt={sidebarOpt}
				subAccounts={subaccounts}
				user={user}
			/>
			<MenuOptions
				details={details}
				id={id}
				sidebarLogo={sideBarLogo}
				sidebarOpt={sidebarOpt}
				subAccounts={subaccounts}
				user={user}
			/>
		</>
	);
};

export default Sidebar;
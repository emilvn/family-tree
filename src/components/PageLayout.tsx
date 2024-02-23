import {PropsWithChildren} from "react";

function PageLayout({children} : PropsWithChildren) {
	return (
		<div>
			<main>{children}</main>
		</div>
	);
}

export default PageLayout;
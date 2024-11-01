"use client";

import { logout } from "../(public)/login/actions";

export default function Home() {
	return (
		<div>
			<button onClick={() => logout()}>Logout</button>
		</div>
	);
}

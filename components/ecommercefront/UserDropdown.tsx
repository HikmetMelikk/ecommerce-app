import { getSession } from "@/app/utils/getSession";
import { signOut } from "@/auth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export async function UserDropdown() {
	const session = await getSession();
	const user = session?.user;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-10 w-10 rounded-full">
					<Avatar className="h-10 w-10">
						<AvatarFallback>{user.name}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="flex flex-col space-y-1">
					<p className="text-sm font-medium leading-none">Hikmet</p>
					<p className="text-sm text-muted-foreground leading-none">
						{user.email}
					</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<form
						action={async () => {
							"use server";
							await signOut();
						}}>
						<Button variant="ghost" className="w-full">
							Sign out
						</Button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

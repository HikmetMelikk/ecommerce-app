import { register } from "@/app/utils/actions";
import { getSession } from "@/app/utils/getSession";
import { redirect } from "next/navigation";
import { SubmitButton } from "../dashboard/SubmitButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default async function SignUpForm() {
	const session = await getSession();
	const user = session?.user;
	if (user) redirect("/");

	return (
		<form action={register}>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your informations below to sign up for ClothesWorld
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="name"
								placeholder="name"
								name="name"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="email@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input id="password" name="password" type="password" required />
						</div>
						<SubmitButton text="Sign Up" />
					</div>
				</CardContent>
			</Card>
		</form>
	);
}

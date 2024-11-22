import bcrypt from "bcryptjs";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/db";

export const authConfig = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},

			authorize: async (credentials) => {
				const email = credentials.email as string;
				const password = credentials.password as string;
				if (!email || !password) {
					throw new CredentialsSignin({ message: "Missing email or password" });
				}
				const user = await prisma.user.findUnique({
					where: { email },
					select: { email: true, password: true, role: true },
				});
				if (!user) {
					throw new CredentialsSignin({ message: "No user found" });
				}
				const passwordMatched = await bcrypt.compare(password, user.password);
				if (!passwordMatched) {
					throw new CredentialsSignin({ message: "Incorrect password" });
				}
				const userData = {
					email: user.email,
					password: user.password,
					role: user.role,
				};
				return userData;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token?.sub && token?.role) {
				session.user.id = token.sub;
				session.user.role = token.role;
			}
			return session;
		},

		async jwt({ token, user }) {
			if (user) {
				token.role = user.role;
			}
			return token;
		},

		signIn: async ({ account }) => {
			if (account?.provider === "credentials") {
				return true;
			} else {
				return false;
			}
		},
	},
	pages: {
		signIn: "/auth/sign-in",
	},
} satisfies NextAuthConfig;

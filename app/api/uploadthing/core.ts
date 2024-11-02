import { getUser } from "@/app/data/user";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
		// Set permissions and file types for this FileRoute
		.middleware(async () => {
			try {
				const user = await getUser();

				// If you throw, the user will not be able to upload
				if (!user) throw new UploadThingError("Unauthorized: User not found");

				// Whatever is returned here is accessible in onUploadComplete as `metadata`
				return { userId: user.id };
			} catch (error) {
				console.error("Middleware error:", error);
				throw error;
			}
		})
		.onUploadComplete(async ({ metadata, file }) => {
			try {
				// This code RUNS ON YOUR SERVER after upload
				console.log("Upload complete for userId:", metadata.userId);

				console.log("file url", file.url);

				// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
				return { uploadedBy: metadata.userId };
			} catch (error) {
				console.error("onUploadComplete error:", error);
				throw error;
			}
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

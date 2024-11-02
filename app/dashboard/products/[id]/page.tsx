import { EditForm } from "@/components/dashboard/EditForm";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";

async function getData(productId: string) {
	const data = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!data) {
		notFound();
	}
	return data;
}

export default async function EditProduct({
	params,
}: {
	params: { id: string };
}) {
	const data = await getData(params.id);
	return <EditForm data={data} />;
}

export type Cart = {
	userId: string | undefined;
	items: Array<{
		id: string;
		name: string;
		price: number;
		quantity: number;
		imageString: string;
	}>;
};

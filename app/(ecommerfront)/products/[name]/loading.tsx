import { LoadingProductCart } from "@/components/ecommercefront/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div>
			<Skeleton className="h-10 w-56 my-5" />
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
				<LoadingProductCart />
				<LoadingProductCart />
				<LoadingProductCart />
				<LoadingProductCart />
				<LoadingProductCart />
				<LoadingProductCart />
				<LoadingProductCart />
				<LoadingProductCart />
			</div>
		</div>
	);
}

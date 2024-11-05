import { CategoriesSelection } from "@/components/ecommercefront/CategorySelection";
import { FeaturedProducts } from "@/components/ecommercefront/FeaturedProducts";
import { Hero } from "@/components/ecommercefront/Hero";

export default function IndexPage() {
	return (
		<div>
			<Hero />
			<CategoriesSelection />
			<FeaturedProducts />
		</div>
	);
}

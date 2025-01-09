import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  // Convert price from Decimal to string
  const formattedProducts = latestProducts.map(product => ({
    ...product,
    price: product.price.toString(), // Convert Decimal to string
  }));

  return (
    <>
      <ProductList data={formattedProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;

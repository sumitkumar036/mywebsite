
import { useState, useEffect } from 'react';
import ProductCard from '../product/card/ProductCard';
import config from '../../script/config';
import LoadingScreen from '../loadingScreen/LoadingScreen';

function Home() {
    // State to store the products
    // and loading state
    const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
    });

    const [isLoading, setLoading] = useState(true);

    // Fetch products from the API
    // and store them in local storage to be displayed while fetching new data
    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                const params = new URLSearchParams({ Action: 'product' });

                console.log('Request params:', params.toString());
                const apiEndpoint = `${config.apiEndpoint}?${params.toString()}`;

                const response = await fetch(apiEndpoint, {
                    method: 'GET',
                });

                // Handle the response
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const product = await response.json();
                setProducts(product.data);
                localStorage.setItem('products', JSON.stringify(product.data));
            } 
            catch (error) {
                console.error('Error fetching products:', error);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // This prevents scrolling when the loading screen is displayed
    useEffect(() => {
        document.body.style.overflow = isLoading ? 'hidden' : 'auto';
    }, [isLoading]);

  return (
    // LOADING SCREEN / WELCOME MESSAGE / PRODUCT CARDS
    <div className="container">
         {isLoading && <LoadingScreen message="Loading products..." />} {/* LOADING SCREEN*/}
        <div className="row g-0">
            {products.map(product => 
            (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
                    <ProductCard
                    id={product.id}
                    imageSrc={product.imageSrc}
                    title={product.title}
                    price={product.price}
                    soldOut={product.soldOut}
                    discountPercent="10"

                    />
                </div> ))
            }
        </div>
    </div>
  );
}
export default Home;
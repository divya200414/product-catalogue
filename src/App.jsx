import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error(error);
        setError('Unable to load products. Please try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'all' || product.category === category;

    const matchesMin =
      minPrice === '' || product.price >= Number(minPrice);

    const matchesMax =
      maxPrice === '' || product.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMin &&
      matchesMax
    );
  });

  if (sort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  const resetFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('default');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="/">
          Shop<span>Sphere</span>
        </a>
        <p>Discover products you'll love.</p>
      </header>

      <main className="container">
        <section className="intro">
          <p className="eyebrow">YOUR EVERYDAY MARKETPLACE</p>
          <h1>Find your next favourite.</h1>
          <p>
            Explore products, compare prices, and discover great finds.
          </p>
        </section>

        <section className="filters">
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.replaceAll('-', ' ')}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            placeholder="Min price (₹)"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            aria-label="Minimum price"
          />

          <input
            type="number"
            min="0"
            placeholder="Max price (₹)"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            aria-label="Maximum price"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort products"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <button className="reset-button" onClick={resetFilters}>
            Reset
          </button>
        </section>

        <div className="results-bar">
          <h2>Explore products</h2>
          {!loading && !error && (
            <span>{filteredProducts.length} products found</span>
          )}
        </div>

        {loading ? (
          <div className="message">Loading products...</div>
        ) : error ? (
          <div className="empty-state">
            <h3>Oops! Something went wrong.</h3>
            <p>{error}</p>
            <button className="reset-button" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span>🔎</span>
            <h3>No products found</h3>
            <p>Try another search or adjust your filters.</p>
            <button className="reset-button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <section className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    loading="lazy"
                  />

                  {product.discountPercentage > 0 && (
                    <span className="discount">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>

                <div className="product-info">
                  <span className="category-label">
                    {product.category.replaceAll('-', ' ')}
                  </span>

                  <h3>{product.title}</h3>

                  <div className="rating">
                    <span>★</span> {product.rating.toFixed(1)}
                  </div>

                  <div className="price-row">
                    <strong>₹{product.price.toFixed(2)}</strong>
                    <span>{product.availabilityStatus}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <footer className="footer">
        Built with React · Powered by DummyJSON
      </footer>
    </div>
  );
}

export default App;


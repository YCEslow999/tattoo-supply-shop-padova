import React, { useState, useEffect, useMemo } from 'react';
import './Products.css';
import InkCard from '../../common/InkCard/InkCard';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');


    /* Scroll to top on mount */
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  

  const location = useLocation();
  const selectedCategory = location.state?.selectedCategory;

  /* Fetch di TUTTI i prodotti dal backend */
  useEffect(() => {
    axios.get('http://localhost:5001/api/products/all')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);


  /* Se vengo da SectionsBar, imposto la search con il nome passato */
  useEffect(() => {
    if (selectedCategory) {
      setSearch(String(selectedCategory).replace(/_/g, ' '));
    }
  }, [selectedCategory]) ;

  /* Filtro ricerca e ordinamento */
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filtro ricerca per nome
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchLower)
      );
    }

    // Ordinamento
    const sorted = [...filtered];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return sorted;
  }, [products, search, sortBy]);

  return (
    <div className="inchiostro-page">
      <div className="inchiostro-header">
        <div className="inchiostro-title">TUTTI I PRODOTTI</div>
      </div>

      {/* Barra di ricerca */}
      <div className="products-search-container">
        <input
          type="text"
          className="products-search-input"
          placeholder="Cerca per nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Dropdown ordinamento */}
      <div className="inchiostro-sort-container">
        <label className="sort-label">Ordina per:</label>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Predefinito</option>
          <option value="price-low">Prezzo, Da basso a alto</option>
          <option value="price-high">Prezzo, Da alto a basso</option>
        </select>
      </div>

      {/* Container prodotti */}
      <div className="inchiostro-container">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product, index) => (
            <div
              key={product._id}
              className="ink-card-wrapper"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to="/product-detail"
                state={{ product }}
              >
                <InkCard
                  image={product.image_url}
                  title={product.name}
                  price={product.price}
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="products-empty">
            Nessun prodotto trovato per "{search}"
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
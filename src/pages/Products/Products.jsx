import React, { useState, useEffect, useMemo } from 'react';
import './Products.css';
import InkCard from '../../common/InkCard/InkCard';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryLocal, setSelectedCategoryLocal] = useState(null);

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  const selectedCategoryFromState = location.state?.selectedCategory;

  /* Fetch di TUTTI i prodotti dal backend */
  useEffect(() => {
    axios.get('http://localhost:5001/api/products/all')
      .then(res => setProducts(res.data || []))
      .catch(err => console.log(err));

    // Fetch categories (name + image_url) dalla collection categories
    axios.get('http://localhost:5001/api/categories/all')
      .then(res => {
        // res.data expected: [{ name, image_url }, ...]
        setCategories(res.data || []);
      })
      .catch(err => console.log('categories fetch error', err));
  }, []);

  /* Se vengo da SectionsBar, imposto la categoria selezionata */
  useEffect(() => {
    if (selectedCategoryFromState) {
      setSelectedCategoryLocal(String(selectedCategoryFromState));
      setSearch('');
    }
  }, [selectedCategoryFromState]);

  const slugify = (str) => String(str).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  const getCategoryImageUrl = (categoryObj) => {
    if (!categoryObj) return '/images/categories/default.jpg';
    return categoryObj.image_url || `/images/categories/${slugify(categoryObj.name)}.jpg`;
  };

  const handleSelectCategory = (cat) => {
    setSelectedCategoryLocal(cat);
    setSearch('');
  };

  const handleClearCategory = () => {
    setSelectedCategoryLocal(null);
    setSearch('');
  };

  /* Filtro ricerca e ordinamento - attivo solo quando è selezionata una categoria */
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategoryLocal) {
      filtered = products.filter(p => p.category === selectedCategoryLocal);
    } else if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = products.filter(product => product.name.toLowerCase().includes(searchLower));
    } else {
      // Se non c'è categoria selezionata e non c'è ricerca, non mostrare prodotti
      filtered = [];
    }

    // Ordinamento
    const sorted = [...filtered];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return sorted;
  }, [products, search, sortBy, selectedCategoryLocal]);

  return (
    <div className="inchiostro-page">
      <div className="inchiostro-header">
        {selectedCategoryLocal && (
          <div style={{ marginTop: 8 }}>
            <button className="filter-reset-btn" onClick={handleClearCategory}>Torna alle categorie</button>
          </div>
        )}
      </div>

      {/* Se non è selezionata nessuna categoria mostro le card delle categorie */}
      {!selectedCategoryLocal ? (
        <div style={{ width: '100%', padding: '0 2rem', boxSizing: 'border-box' }}>
          <div className="categories-grid">
            {categories.map(cat => (


              <button
                key={cat.name}
                className="category-card-clean"
                onClick={() => handleSelectCategory(cat.name)}
              >
                <img
                  src={getCategoryImageUrl(cat)}
                  alt={cat.name}
                  className="category-image"
                />

                <div className="category-overlay">
                  <h3 className="category-title-clean">
                    {cat.name}
                  </h3>
                </div>
              </button>

            ))}
            {categories.length === 0 && (
              <div className="products-empty">Nessuna categoria trovata</div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Barra di ricerca */}
          <div className="products-search-container">
            <input
              type="text"
              className="products-search-input"
              placeholder="Cerca per nome nella categoria..."
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
              <div className="products-empty">Nessun prodotto trovato</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
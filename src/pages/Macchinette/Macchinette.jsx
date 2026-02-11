import React, { useState, useEffect, useMemo } from 'react'
import './Macchinette.css'
import InkCard from '../../common/InkCard/InkCard'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const Macchinette = () => {
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState('default')

    /* Scroll to top on mount */
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    
  /* Fetch dati dal backend */
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/products/machine_products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  /* Ordinamento prodotti */
  const sortedProducts = useMemo(() => {
    const sorted = [...products]

    if (sortBy === 'price-low') {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
    }

    return sorted
  }, [products, sortBy])

  return (
    <div className="inchiostro-page">
      <div className="inchiostro-header">
        <h1 className="inchiostro-title">Macchinette</h1>
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
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
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
        ))}
      </div>
    </div>
  )
}

export default Macchinette

import { useState } from "react";
import "./SectionsBar.css";
import { categoriesImages } from "../../assets/assets";
import { redirect, useNavigate } from "react-router-dom";

const categories = {
  Inchiostro: ["Intenze", "World_Famous", "Eternal_Ink", "Dynamic"],

};



export const SectionsBar = () => {
  const [active, setActive] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});
  const [fetchedBrands, setFetchedBrands] = useState({});


  const fetchBrandsByCategory = async (category) => {
    try {
      const res = await fetch(`http://localhost:5001/api/brands/${category}`);
      const data = await res.json();


      setFetchedBrands(prev => ({
        ...prev,
        [category]: data
      }));
    } catch (err) {
      console.error(err);
    }
  }

  const navigate = useNavigate();

  const toggleSection = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

    if (!fetchedBrands[key]) {
      fetchBrandsByCategory(key);
    }
  };



  // item is the brand name; we also need the category context when navigating
  const handleItemClick = (category, item) => {
    navigate("/shop", { state: { selectedCategory: category, selectedBrand: item } });
  };


  return (
    <div
      className="sectionsbar-wrapper"
      onMouseLeave={() => setActive(null)}
    >
      <div className="sectionsbar-container">
        <button
          className={`sections-toggle ${drawerOpen ? 'hidden' : ''}`}
          aria-label="Apri menu categorie"
          aria-hidden={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
        <ul>
          <li
            onMouseEnter={() => {
              setActive("Inchiostro");
              if (!fetchedBrands["Inchiostro"]) {
                fetchBrandsByCategory("Inchiostro");
              }
            }}
          >
            Inchiostro
          </li>
        </ul>
      </div>
      {/* MOBILE LEFT DRAWER */}
      <div className={`mobile-sections-drawer ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Chiudi">✕</button>
          <div className="drawer-content">
            {Object.keys(categories).map(catKey => (
              <div key={catKey} className={`drawer-section ${openSections[catKey] ? 'open' : ''}`}>
                <button
                  className="drawer-section-title"
                  onClick={() => toggleSection(catKey)}
                  aria-expanded={!!openSections[catKey]}
                >
                  {catKey.replace(/([A-Z])/g, ' $1').replace('_', ' ')}
                  <span className={`drawer-arrow ${openSections[catKey] ? 'open' : ''}`}>▾</span>
                </button>
                <div className="drawer-items" style={{ display: openSections[catKey] ? 'flex' : 'none' }}>
                  {fetchedBrands[catKey]?.map(brand => (
                    <div
                      key={brand.name}
                      className="drawer-item"
                      onClick={() => {
                        handleItemClick(catKey, brand.name);
                        setDrawerOpen(false);
                      }}
                    >
                      <div className="icon-wrap">
                        <img
                          src={brand.image_url}
                          alt={brand.name}
                          className="dropdown-icon"
                        />
                      </div>
                      <div className="drawer-item-text">
                        {brand.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`sectionsbar-dropdown ${active ? "open" : ""}`}>
        {active &&
          fetchedBrands[active]?.map(brand => (
            <div key={brand.name} className="dropdown-item"
              onClick={() => {
                handleItemClick(active, brand.name);
                console.log(brand.name);
              }

              }
            >
              <img
                src={brand.image_url}
                className="dropdown-icon"
                alt={brand.name}
              />
              <span className="dropdown-text">{brand.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default SectionsBar;

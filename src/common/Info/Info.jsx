import React, { useState } from 'react'
import './Info.css'
import './ig-logo.css'
import { Route, Link } from 'react-router-dom';
import Rose from '../../assets/rose_tattoo_traditional.png';
import SkullDagger from '../../assets/dagger_skull_tattoo.png';
import IgLogo from '../../assets/ig_logo.png';

export const Info = () => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className="info-container">
            <div className="info-image">
                
                {/* Sample tattoo-related images */}
                <div className="info-images-grid">
                    <div className="info-sample-image info-sample-1">
                        <img src={Rose} className="sample-image"></img>
                    </div>
                    <div className="info-sample-image info-sample-2">
                        <img src={SkullDagger} className="sample-image"></img>
                    </div>

                    <div className="info-sample-image info-sample-3">
                        <img src={Rose} className="sample-image"></img>
                    </div>

                </div>

                <div className="info-text">
                    <div className="info-text-wrapper">
                        <h1 className="info-title">IL SUPPLIER DI PADOVA</h1>
                        
                        <p className="info-description">La tua fonte di fiducia per i migliori materiali e attrezzature professionali</p>
                        <div className="buttons-container">
                            <button 
                                className={`info-button ${isHovered ? 'hovered' : ''}`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <Link to = "/info">Scopri di più</Link>
                                <span className="button-arrow">→</span>
                            </button>

                            
                        <a
                            className="ig-link"
                            href="https://www.instagram.com/tattoosupplyshop_padova/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <img className="ig-logo" src={IgLogo} alt="Instagram" />
                        </a>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info

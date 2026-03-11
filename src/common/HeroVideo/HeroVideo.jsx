import React from 'react'
import './HeroVideo.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import HomeCard from '../HomeCard/HomeCard';
const video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
import CategoryCard from '../CategoryCard/CategoryCard';
import chromecross from '../../assets/chrome_cross.png'
import inchiostroImage from '../../assets/inchiostro.jpg';
export const HeroVideo = () => {
  return (
    <>

      <div className="hero-video-container">
        <div className="separator">
        </div>
        <div className="testo-video">
          <h1 className="title-video">categorie in primo piano</h1>
          <img src={chromecross} alt="Chrome Cross" className="chrome-cross" />
        </div>
        <CategoryCard title="" imageUrl={inchiostroImage} path="/inchiostro" />
        
    
      </div>


    </>


  )
}

export default HeroVideo

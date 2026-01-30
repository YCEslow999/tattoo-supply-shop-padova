import React from 'react'
import './HeroVideo.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import ReactPlayer from 'react-player';
import HomeCard from '../HomeCard/HomeCard';
const video = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
import CategoryCard from '../CategoryCard/CategoryCard';
import chromecross from '../../assets/chrome_cross.png'
export const HeroVideo = () => {
  return (
    <>

      <div className="hero-video-container">
        <div className="separator">
        </div>
        <div className="testo-video">
          <h1 className="title-video">Categorie</h1>
          <img src={chromecross} alt="Chrome Cross" className="chrome-cross" />
        </div>
        <CategoryCard title="INCHIOSTRI" imageUrl="https://images.pexels.com/photos/4123711/pexels-photo-4123711.jpeg" path="/inchiostro" />
        
    
      </div>


    </>


  )
}

export default HeroVideo

import React, { useState, useEffect } from "react";
import "./Home.css"
import { Hero } from "../../common/Hero/Hero";
import SectionsBar from "../../common/SectionsBar/SectionsBar";

import HeroVideo from "../../common/HeroVideo/HeroVideo";
import Info from "../../common/Info/Info";

export const Home = () => {
    return (
        <>
            <SectionsBar />
            <Hero />
            <HeroVideo />
            <Info />
        </>
    )
}
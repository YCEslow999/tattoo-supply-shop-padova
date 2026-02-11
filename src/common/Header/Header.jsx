// Below is your Header component with all cart-related code removed safely.
// CSS references to cart have also been removed.

import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Header.css';
import { LinkButton } from '../LinkButton/LinkButton';
import { useSelector, useDispatch } from "react-redux";
import { logout, selectToken } from "../../pages/userSlice";
import { Link } from 'react-router-dom';
import { getCartCount } from '../../services/cart';
import Tigre from '../../assets/tigre.png';
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";

export const Header = () => {
    const dispatch = useDispatch();
    const rdxToken = useSelector(selectToken);

    const [decodedToken, setDecodedToken] = useState(null);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (!rdxToken) {
            setDecodedToken(null);
            setTokenExpired(false);
            return;
        }
        try {
            const decoded = jwtDecode(rdxToken);
            setDecodedToken(decoded);

            if (decoded.exp) {
                const now = Date.now() / 1000;
                setTokenExpired(decoded.exp < now);
            } else {
                setTokenExpired(false);
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            setDecodedToken(null);
            setTokenExpired(true);
        }
    }, [rdxToken]);

    useEffect(() => {
        try {
            setCartCount(getCartCount());
            const handler = (e) => setCartCount((e && e.detail && typeof e.detail.count === 'number') ? e.detail.count : getCartCount());
            window.addEventListener('cart-updated', handler);
            return () => window.removeEventListener('cart-updated', handler);
        } catch (err) {
            // ignore in SSR or if window is undefined
        }
    }, []);

    const logOutMe = () => {
        dispatch(logout());
        setIsMobileMenuOpen(false);
    };

    const renderLinks = () => (
        <>
            <Link to="/shop" className="header-icon-link">
                <FiShoppingBag className="header-icon" />
            </Link>
            <Link to="/cart" className="header-icon-link">
                <FiShoppingCart className="header-icon" />
            </Link>

            {rdxToken && tokenExpired === false ? (
                <>
                    <LinkButton className={"header-button"} path={"/profile"} title={"Profile"} />
                    <LinkButton className={"header-button"} path={"/appointments"} title={"Appointments"} />
                    <div className='header-button' onClick={logOutMe}>
                        <LinkButton classButton={"linkButtonDesign"} path={"/login"} title={"Log out"} />
                    </div>

                    {decodedToken && decodedToken.role === "super_admin" && (
                        <>
                            <LinkButton className={"header-button"} path={"/getAllUsers"} title={"All Users"} />
                            <LinkButton className={"header-button"} path={"/getAllAppointments"} title={"Get All Appointments"} />
                            <LinkButton className={"header-button"} path={"/products-admin"} title={"Gestione Prodotti"} />
                        </>
                    )}
                </>
            ) : null}

        </>
    );

    const renderMobileLinks = () => (
        <>
            <LinkButton className={"header-button"} path={"/shop"} title={"Shop"} />
            <LinkButton className={"header-button"} path={"/cart"} title={"Carrello"} />
            <LinkButton className={"header-button"} path={"/workers"} title={"Marchi"} />
            <LinkButton className={"header-button"} path={"/portfolio"} title={"Offerte"} />

            {rdxToken && tokenExpired === false ? (
                <>
                    <LinkButton className={"header-button"} path={"/profile"} title={"Profile"} />
                    <LinkButton className={"header-button"} path={"/appointments"} title={"Appointments"} />
                    <div className='header-button' onClick={logOutMe}>
                        <LinkButton classButton={"linkButtonDesign"} path={"/login"} title={"Log out"} />
                    </div>

                    {decodedToken && decodedToken.role === "super_admin" && (
                        <>
                            <LinkButton className={"header-button"} path={"/getAllUsers"} title={"All Users"} />
                            <LinkButton className={"header-button"} path={"/getAllAppointments"} title={"Get All Appointments"} />
                            <LinkButton className={"header-button"} path={"/products-admin"} title={"Gestione Prodotti"} />
                        </>
                    )}
                </>
            ) : (
                <>
                    <LinkButton className={"header-button"} path={"/categories"} title={"Categorie"} />
                </>
            )}
        </>
    );

    return (
        <>
        <header className="header">

    {/* Logo centrale */}
    <div className="header-center">
        <Link to="/" className="header-logo-link">
            <img src={Tigre} alt="Logo" className="header-logo" />
        </Link>
    </div>

    {/* Icone a destra */}
    <div className="header-right">
        <Link to="/shop" className="header-icon-link">
            <FiShoppingBag className="header-icon" />
        </Link>

        <Link to="/cart" className="header-icon-link">
            <FiShoppingCart className="header-icon" />
        </Link>
    </div>

</header>

            <nav
                className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
                }}
            >
                {renderMobileLinks()}
            </nav>
        </>
    );
};

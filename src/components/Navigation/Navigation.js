import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ShopDropdown from './ShopDropdown';
import BrandsDropdown from './BrandsDropdown';

const Navigation = () => {
    const [query, setQuery] = useState("");
    const shopElement = useRef();
    const brandsElement = useRef();

    function showDropDown(e) {
        const targetName = e.target.getAttribute('name');
        if (targetName === 'shop') {
            shopElement.current.style='max-height: 1000px';
        } else if (targetName === 'brands') {
            brandsElement.current.style='max-height: 1000px';
        }
    }
    function hideDropDown(e) {
        const targetName = e.target.getAttribute('name');
        if (targetName === 'shop') {
            shopElement.current.style='max-height: 0';
        } else if (targetName === 'brands') {
            brandsElement.current.style='max-height: 0';
        }
    }

    return (
        <>
        <nav>
            <Link to='/'>
                <h1 className="logo">greenpaws<i className="icon paws"></i>
                </h1>
            </Link>

            <ul className="nav-items basic">
                <li 
                name="shop"
                onMouseEnter={showDropDown} 
                onMouseLeave={hideDropDown} 
                className="expandable">
                    <Link to='/products'>Shop</Link>
                    <div ref={shopElement} className="dropdown shop-dropdown">
                        <ShopDropdown />
                    </div>
                </li>

                <li 
                name="brands"
                onMouseEnter={showDropDown} 
                onMouseLeave={hideDropDown} 
                className="expandable">
                    <Link to='/brands'>Brands</Link>
                    <div ref={brandsElement} className="dropdown brands-dropdown">
                        <BrandsDropdown />
                    </div>
                </li>

                <li>On Sale</li>
            </ul>

            <form className="search-bar">
                <div className="search-wrapper">
                    <input type="text" placeholder="Search our products" value={query} onChange={e => setQuery(e.target.value)}/>
                    <button type="submit"><i className= "icon search"></i></button>
                </div>
            </form>

            <div className="nav-items right-side">
                <div className="container account-container">
                    <i className="icon account"></i>
                    <p>Account</p>
                </div>
                <div className="container cart-container">
                    <i className="icon cart"></i>
                    <p>Cart</p>
                </div>
            </div>
        </nav>
         <div className="discount-bar">FREE 1-3 DAY SHIPPING OVER $30!</div>
         </>
    )
}
export default Navigation;
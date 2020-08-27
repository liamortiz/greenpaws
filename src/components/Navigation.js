import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    const [query, setQuery] = useState("");
    return (
        <>
        <nav>
            <Link to='/'><h1 className = "logo">greenpaws <i className = "icon paws"></i></h1></Link>
            <ul className = "nav-items basic">
                <li className = "expandable"><Link to='/products'>Shop</Link></li>
                <li className = "expandable">Brands</li>
                <li>On Sale</li>
            </ul>
            <form className="search-bar">
                <div className="search-wrapper">
                    <input type = "text" placeholder="Search our products" value={query} onChange={e => setQuery(e.target.value)}/>
                    <button type = "submit"><i className= "icon search"></i></button>
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
         <div className = "discount-bar">FREE 1-3 DAY SHIPPING OVER $30!</div>
         </>
    )
}
export default Navigation;
import React from 'react';
import { Link } from 'react-router-dom';

const ShopDropdown = () => {
    return (
        <>
            <div>
                <h2>Food<i className = "icon pet-food"></i></h2>
                <Link to="">Wet Food</Link>
                <Link to="">Dry Food</Link>
                <Link to="">Puppy Food</Link>
                <Link to="">Grain Free Food</Link>
                <Link to="/products/category/food" className="btn">Shop All Food</Link>
            </div>
            <div>
                <h2>Supplies<i className = "icon pet-supplies"></i></h2>
                <Link to="">Toys & Apparel</Link>
                <Link to="">Beds & Bedding</Link>
                <Link to="">Bowls & Feeders</Link>
                <Link to="">Dental Care</Link>
                <Link to="/products/category/toys" className="btn">Shop All Supplies</Link>
            </div>
        </>
    )
}

export default ShopDropdown;
import React from 'react';
import { Link } from 'react-router-dom';

const ShopDropdown = () => {
    return (
        <>
            <div>
                <h2>Food<i className = "icon pet-food"></i></h2>
                <Link to="/products/category/food">Dry & Wet Food</Link>
                <Link to="/products/category/snacks">Biscuits & Snacks</Link>
                <Link to="/products/category/chews">Bones & Chews</Link>
                <Link to="/products/category/rawhide">Dog Rawhide</Link>
                <Link to="/products/categories/food&snacks&chews&rawhide" className="btn">Shop All Food</Link>
            </div>
            <div>
                <h2>Supplies<i className = "icon pet-supplies"></i></h2>
                <Link to="/products/categories/toys&clothes">Toys & Apparel</Link>
                <Link to="/products/category/beds">Beds & Bedding</Link>
                <Link to="/products/category/feeders">Bowls & Feeders</Link>
                <Link to="/products/category/dental">Dental Care</Link>
                <Link to="/products/categories/clothes&toys&beds&feeders&dental"  className="btn">Shop All Supplies</Link>
            </div>
        </>
    )
}

export default ShopDropdown;
import React from 'react';
import { Link } from 'react-router-dom';

const ShopDropdown = () => {
    return (
        <>
            <div>
                <h2>Food</h2>
                <Link>Wet Food</Link>
                <Link>Dry Food</Link>
                <Link>Puppy Food</Link>
                <Link>Grain Free Food</Link>
                <Link>Shop All Food</Link>
            </div>
            <div>
                <h2>Supplies</h2>
                <Link>Apparel</Link>
                <Link>Beds & Bedding</Link>
                <Link>Bowls & Feeders</Link>
                <Link>Dental Care</Link>
                <Link>Shop All Supplies</Link>
            </div>
        </>
    )
}

export default ShopDropdown;
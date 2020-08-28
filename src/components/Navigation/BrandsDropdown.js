import React from 'react';
import { Link } from 'react-router-dom';

const BRANDS = [
    'frontline-plus.webp',
    'hills-science-diet.webp',
    'just-food-for-dogs.webp',
    'logo-acana.webp',
    'logo-orjien.jpg',
    'royal-canin.webp',
    'taste-of-the-wild.webp',
    'wholehearted.webp'
]

const BrandsDropdown = () => {
    function getImages() {
        return BRANDS.map(brand =>
                <img src={require(`../../assets/images/brands/${brand}`)} alt={brand}/> 
            )
    }
    return (
        <div>
            {getImages()}
            <Link className="all-brands-btn" to=''>All Brands</Link>
        </div>
    )
}

export default BrandsDropdown;
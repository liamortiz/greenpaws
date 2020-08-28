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
        return BRANDS.map((brand, index) =>
                <Link key = {index} className = "image-links" to=""><img src={require(`../../assets/images/brands/${brand}`)} alt={brand}/> </Link>
            )
    }
    return (
        <div>
            <h2>Check out our most popular brands</h2>
            {getImages()}
            <Link className="btn all-brands-btn" to="">All Brands</Link>
        </div>
    )
}

export default BrandsDropdown;
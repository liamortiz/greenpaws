import React, { Component } from 'react';
import mainHero from '../../assets/images/hero-1.jpg';

class Gallery extends Component {
    render() {
        return (
            <div className="gallery-wrapper">
                <img src={mainHero} alt="hero" />
            </div>
        )
    }
}

export default Gallery;
import React, { Component } from 'react';
import hero1 from '../../assets/images/hero-1.jpg';
import hero2 from '../../assets/images/hero-2.jpg';
import hero3 from '../../assets/images/hero-3.jpg';

class Gallery extends Component {
    state = {
        currentIndex:0
    }
    updateIndex = (e) => {
        this.toggleActiveCircle();
        e.target.classList.add('active-circle');

        const targetImageIndex = e.target.dataset.index;
        this.setState({ currentIndex: targetImageIndex });
    }
    toggleActiveCircle() {
        document.querySelectorAll('.active-circle').forEach(element => 
            element.classList.remove('active-circle'));
    }
    render() {
        return (
            <div className="gallery-wrapper">
                <img alt="doggy" className="islider" src={hero1} style={{transform: `translateX(${this.state.currentIndex}%)` }}/>
                <img alt="doggy" className="islider" src={hero2} style={{transform: `translateX(${this.state.currentIndex}%)` }}/>
                <img alt="doggy" className="islider" src={hero3} style={{transform: `translateX(${this.state.currentIndex}%)` }}/>
                <div className="nav-circles">
                    <span data-index="0" onClick={this.updateIndex} className="active-circle"></span>
                    <span data-index="-100" onClick={this.updateIndex}></span>
                    <span data-index="-200" onClick={this.updateIndex}></span>
                </div>
            </div>
        )
    }
}

export default Gallery;
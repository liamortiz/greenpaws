 import React from 'react';
 import Gallery from '../components/Gallery/Gallery';
import { Link } from 'react-router-dom';

 const Home = () => {
     return (
         <div className="wrapper home-wrapper">
             <Gallery />
             <div className="container top-products">
                <h2>Customer Favorites</h2>
                <div className="products-preview">
                    <div className="product-box">
                        <img src="" alt="" />
                        <div className="details">
                            <h3>Dog Scooper<small> Breakfast Dog Toy. Medium</small></h3>
                            <p className="current-price">$33.25</p>
                            <p className="previous-price">$44.20</p>
                            <button>Add Cart</button>
                        </div>
                    </div>
                    <div className="product-box">

                    </div>
                    <div className="product-box">

                    </div>

                    <div className="product-box">

                    </div>
                    <div className="product-box">

                    </div>
                    <div className="product-box">

                    </div>
                </div>
             </div>
         </div>
     )
 }
 export default Home;
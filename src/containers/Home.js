import React, { Component } from 'react';
import Gallery from '../components/Gallery/Gallery';
import { BASE_URL } from '../App';
import { CLOUD_NAME } from '../App';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';

class Home extends Component {
    state={products:[]}

    componentDidMount() {
        this.getTopProducts();
    }

    getTopProducts() {
        fetch(BASE_URL+'/products/popular')
            .then(resp => resp.json())
            .then(data => this.setState({ products: data.slice(0, 6) }));
    }

    getDiscountPrice(product) {
        return product.price - ((product.price / 100) * product.discount)
    }

    setProducts() {
        return this.state.products.map((product, index) => {
            return (
                <div key={index} className="product-box">
                    <Link to=""><Image cloudName={CLOUD_NAME} publicId={product.image_urls[0]} /></Link>
                    <div className="details">
                        <h3>{product.title.slice(0, 45)}..</h3>
                        <p className="current-price">${ this.getDiscountPrice(product) }</p>
                        { product.discount != 0 && <p className="previous-price">${product.price}</p>}
                        <button>Add Cart</button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="wrapper home-wrapper">
                <Gallery />
                <div className="container top-products">
                   <h2>Customer Favorites</h2>
                   <div className="products-preview">
                       {this.setProducts()}
                   </div>
                </div>
            </div>
        )
    }
}
 export default Home;
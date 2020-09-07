import React, { Component } from 'react';
import salesHero from '../../assets/images/deals.jpg'
import { BASE_URL } from '../../App';
import ProductCard from '../Shop/ProductCard';

class SaleContainer extends Component {
    state={products:[]}

    componentDidMount() {
        this.fetchProducts()
    }
    fetchProducts() {
        fetch(BASE_URL + '/products/onsale')
            .then(resp => resp.json())
            .then(products => this.setProductCards(products));
    }

    setProductCards(products) {
        const allProducts = products.map((product, index) => <ProductCard key={index} product={product} />);
        this.setState({
            products: allProducts
        })
    }
    render() {
        return (
            <div className = "wrapper sales-wrapper">
                <img className="hero" src={salesHero} alt="On Sale Products" />
                <p className="heading">Looking for deals on your favorite brands of pet food and treats?</p>
                <div className="product-wrapper">
                    <div className="products-onsale">
                        {this.state.products}
                    </div>
                </div>
            </div>
        )
    }
}
export default SaleContainer;
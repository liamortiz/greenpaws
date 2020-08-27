import React, { Component } from 'react';
import Product from '../components/Product';

class ProductContainer extends Component {
    state = {category: 'toys'}
    
    fetchProducts() {
        fetch(`http://localhost:8080/products/category/${this.state.category}`)
        .then(resp => resp.json())
        .then(products => {
            this.setState({
                products: products
            })
        })
    }
    getProducts() {
        if (!this.state.products) return;
        return this.state.products.map(product => 
            <Product product={{...product, ...{'category' : this.state.category}} } />)
    }
    componentDidMount() {
        //this.fetchProducts()
        console.log(this.props.match.params);
    }

    render() {
        return ( 
            <div className = "product-wrapper">
                <h1>Hello from product container</h1>
            </div>
        )
    }
}
export default ProductContainer;
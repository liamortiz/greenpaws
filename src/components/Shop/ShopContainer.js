import React, { Component } from 'react';
import { BASE_URL } from '../../App';
import ProductCard from './ProductCard';
import FilterSettings from './FilterSettings';

class ShopContainer extends Component {
    state = {
        products: [],
        productsOnPage: [],
        currentPage: 1,
        maxResults: 20
    }

    componentDidMount() {
        console.log(this.props.match.params.params1);
        this.fetchProducts();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.params2 !== this.props.match.params.params2) {
            window.location.reload()
        }
    }
    fetchProducts() {
        fetch(BASE_URL + `/products/${this.props.match.params.params1 || 'category'}/${this.props.match.params.params2 || 'food'}`)
            .then(resp => resp.json())
            .then(products => this.setProductCards(products));
    }

    setProductCards(products) {
        const allProducts = products.map((product, index) => <ProductCard key={index} product={product} />);
        this.setState({
            products: allProducts,
            productsOnPage: allProducts.slice(0, this.state.maxResults)
        })
    }
    getPageNumbers() {
        const pages = [];
        const min = 0;
        const max = Math.floor(this.state.products.length / this.state.maxResults) + 1;
        for (let i = min; i < max; i++) {
            pages.push(<button key={i} onClick={() => this.updateCurrentPage(i+1)} className={(i+1===this.state.currentPage) ? "active-page" : ""}>{i+1}</button>)
        }
        return pages;
    }
    updateCurrentPage = (nextPageNumber) => {
        const min = this.state.maxResults * (nextPageNumber-1);
        const max = min + this.state.maxResults;
        
        if (nextPageNumber <= 0 || nextPageNumber > Math.floor(this.state.products.length / this.state.maxResults) + 1 || nextPageNumber === this.state.currentPage) return;

        this.setState({
            currentPage: nextPageNumber,
            productsOnPage: this.state.products.slice(min, max)
        })
    }

    sortProducts = (event) => {
        const query = event.target.value;
        const products = [...this.state.products]
        const min = this.state.maxResults * (this.state.currentPage-1);
        const max = min + this.state.maxResults;

        switch(query) {
            case 'reviews':
                products.sort((a, b) => b.props.product.review_count - a.props.product.review_count)
                break;
            case 'popular':
                products.sort((a, b) => b.props.product.average_rating - a.props.product.average_rating)
                break;
            case 'low':
                products.sort((a, b) => a.props.product.price - b.props.product.price)
                break;
            case 'high':
                products.sort((a, b) => b.props.product.price - a.props.product.price)
                break;
            case 'a-z':
                products.sort((a, b) => a.props.product.title.toLowerCase().charCodeAt(0) - b.props.product.title.toLowerCase().charCodeAt(0))
                break;
            case 'z-a':
                products.sort((a, b) => b.props.product.title.toLowerCase().charCodeAt(0) - a.props.product.title.toLowerCase().charCodeAt(0))
                break;
            default:
                break;
        }

        this.setState({
            products,
            productsOnPage: products.slice(min, max)
        })
    }

    filterByPrice = ({target}) => {
        const min = this.state.maxResults * (this.state.currentPage-1);
        const max = min + this.state.maxResults;
        let products = this.state.products;

        switch(target.value) {
            case '<10':
                products = this.state.products.filter(product => product.props.product.price < 10);
                break;
            case '10-25':
                products = this.state.products.filter(product => product.props.product.price >= 10 && product.props.product.price < 25);
                break;
            case '25-50':
                products = this.state.products.filter(product => product.props.product.price >= 25 && product.props.product.price < 50);
                break;
            case '50-100':
                products = this.state.products.filter(product => product.props.product.price >= 50 && product.props.product.price <= 100);
                break;
            default:
                break;
        }
        this.setState({
            products,
            productsOnPage: products.slice(min, max)
        })
    }

    filterByBrand = ({target}) => {
        const min = this.state.maxResults * (this.state.currentPage-1);
        const max = min + this.state.maxResults;
        const products = this.state.products.filter(product => product.props.product.brand === target.value);
        this.setState({
            products,
            productsOnPage: products.slice(min, max)
        })
    }
    filterByRating = ({target}) => {
        target = target.nodeName === 'BUTTON' ? target : target.parentNode;
        const min = this.state.maxResults * (this.state.currentPage-1);
        const max = min + this.state.maxResults;
        const products = this.state.products.filter(product => Math.max(1, product.props.product.average_rating) === parseInt(target.name));
        this.setState({
            products,
            productsOnPage: products.slice(min, max)
        })
    }

    render() {
        return (
            <div className="wrapper shop-wrapper">
                <div className="product-browse">
                    <div className="products-container">
                        <div className="filtering">

                            <FilterSettings 
                            products={this.state.products} 
                            filterByPrice={this.filterByPrice} 
                            filterByBrand={this.filterByBrand} 
                            filterByRating={this.filterByRating} />

                        </div>
                        <div className="product-result-wrapper">
                        <div className="sort-by">
                                <h1>Dog {this.props.match.params.params2 || 'food'}</h1>
                                <span>
                                    ({(this.state.maxResults * (this.state.currentPage -  1) + 1)} - {Math.min(this.state.products.length, this.state.maxResults * this.state.currentPage)} of {this.state.products.length} results)
                                </span>
                                
                                <div className="sorting-container">
                                    <span>Sort By</span>
                                    <select onChange={this.sortProducts} name="sort-query" className="sort-select" defaultValue={'none'}>
                                        <option value="none" defaultValue disabled hidden> 
                                            Select an Option 
                                        </option> 
                                        <option value="popular">Most Popular</option>
                                        <option value="reviews">Most Reviews</option>
                                        <option value="low">Price Low to High</option>
                                        <option value="high">Price High to Low</option>
                                        <option value="a-z">Name A-Z</option>
                                        <option value="z-a">Name Z-A</option>
                                    </select>
                                </div>
                            </div>
                            <div className="product-result">
                                {this.state.productsOnPage}
                            </div>
                            <div className="pagination">
                                <button onClick={() => this.updateCurrentPage(this.state.currentPage-1)}>Prev</button>
                                {this.getPageNumbers()}
                                <button onClick={() => this.updateCurrentPage(this.state.currentPage+1)}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ShopContainer;
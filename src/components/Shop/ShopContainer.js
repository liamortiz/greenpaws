import React, { Component } from 'react';
import { BASE_URL } from '../../App';
import ProductCard from './ProductCard';
import FilterSettings from './FilterSettings';

class ShopContainer extends Component {
    state = {
        products: [],
        productsOnPage: [],
        allProducts: [],
        currentPage: 1,
        maxResults: 20,
        currentFilters: []
    }

    componentDidMount() {
        this.fetchProducts();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.params2 !== this.props.match.params.params2) {
            window.location.reload()
        }
        if (prevState.currentFilters !== this.state.currentFilters) {
            this.applyFilters();
        }
        if (prevState.products !== this.state.products) {
            this.updateCurrentPage(1);
        }
    }
    fetchProducts() {
        fetch(BASE_URL + this.props.location.pathname + this.props.location.search)
            .then(resp => resp.json())
            .then(products => this.setProductCards(products));
    }

    setProductCards(products) {
        const allProducts = products.map((product, index) => <ProductCard key={index} product={product} />);
        this.setState({
            products: allProducts,
            productsOnPage: allProducts.slice(0, this.state.maxResults),
            allProducts
        })
    }
    getPageNumbers() {
        const pages = [];
        const min = 0;
        const max =  Math.floor(this.state.products.length / this.state.maxResults) + ((this.state.products.length % this.state.maxResults !== 0) ? 1 : 0);
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

    applyFilters() {
        const min = this.state.maxResults * (this.state.currentPage-1);
        const max = min + this.state.maxResults;
        let currentFilters=[...this.state.currentFilters];
        let products = this.state.allProducts;
        let filteredProducts=[];

        // Handle Price
        currentFilters.forEach(filter => {
            if (filter === '<10') {
                filteredProducts.push(products.filter(product => product.props.product.price < 10));
            }
            if (filter === '10-25') {
                filteredProducts.push(products.filter(product => product.props.product.price >= 10 && product.props.product.price < 25));
            }
            if (filter === '25-50') {
                filteredProducts.push(products.filter(product => product.props.product.price >= 25 && product.props.product.price < 50));
            }
            if (filter === '50-100') {
                filteredProducts.push(products.filter(product => product.props.product.price >= 50 && product.props.product.price <= 100));
            }
            if (typeof filter === 'object' && filter.hasOwnProperty('brand')) {
                filteredProducts.push(products.filter(product => product.props.product.brand === filter.brand));
            }
            if (typeof filter === 'object' && filter.hasOwnProperty('rating')) {
                filteredProducts.push(products.filter(product => Math.max(1, product.props.product.average_rating) === filter.rating));
            }
        })
       
        filteredProducts = filteredProducts.flat();
        if (filteredProducts.length <= 0) {
            filteredProducts = products;
        }
        this.setState({
            products: filteredProducts,
            productsOnPage: filteredProducts.slice(min, max)
        })
    }

    filterByPrice = ({target}) => {
        document.getElementById('filter-brand-form').reset();

        let currentFilters=[...this.state.currentFilters];
        currentFilters = currentFilters.filter(element => typeof element==='string'); 

        const filterIndex = currentFilters.indexOf(target.value);
        if (filterIndex !== -1) {
            currentFilters = currentFilters.slice(0, filterIndex).concat(currentFilters.slice(filterIndex+1));
        } else {
            currentFilters.push(target.value)
        }
        this.setState({ currentFilters })
    }

    filterByBrand = ({target}) => {
        document.getElementById('filter-price-form').reset();

        let currentFilters=[...this.state.currentFilters];
        currentFilters = currentFilters.filter(element => element.hasOwnProperty('brand')); 

        const filterIndex = this.state.currentFilters.findIndex(element => element.brand === target.value);
        if (filterIndex !== -1) {
            currentFilters = currentFilters.slice(0, filterIndex).concat(currentFilters.slice(filterIndex+1));
        } else {
            currentFilters.push({brand: target.value})
        }
        this.setState({
            currentFilters
        })
    }
    filterByRating = ({target}) => {
        target = target.nodeName === 'BUTTON' ? target : target.parentNode;

        document.getElementById('filter-brand-form').reset();
        document.getElementById('filter-price-form').reset();

        const rating = parseInt(target.name);
        const currentFilters=[{rating}]
        this.setState({
            currentFilters
        })
    }

    render() {
        return (
            <div className="wrapper shop-wrapper">
                <div className="product-browse">
                    <div className="products-container">
                        <div className="filtering">

                            <FilterSettings 
                            products={this.state.allProducts} 
                            filterByPrice={this.filterByPrice} 
                            filterByBrand={this.filterByBrand} 
                            filterByRating={this.filterByRating} />

                        </div>
                        <div className="product-result-wrapper">
                        <div className="sort-by">
                                <h1>Product Results</h1>
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
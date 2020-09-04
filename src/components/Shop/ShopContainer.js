import React, { Component } from 'react';
import { BASE_URL } from '../../App';
import ProductCard from './ProductCard';
import FilterSettings from './FilterSettings';

class ShopContainer extends Component {
    state = {
        products: [],
        productsOnPage: [],
        category: 'food',
        currentPage: 1,
        maxResults: 20
    }

    componentDidMount() {
        const category = this.props.match.params.params2;
        if (this.state.category != category) {
            console.log("Pass");
        }
        console.log(this.state.category);
        this.fetchProducts();
    }
    fetchProducts(category=this.state.category) {
        fetch(BASE_URL + `/products/category/${category}`)
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
        switch(target.value) {
            case '<10':
                this.setState({
                    productsOnPage: this.state.products.filter(product => product.props.product.price < 10)
                })
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div className="wrapper shop-wrapper">
                <div className="product-browse">
                    <div className="products-container">
                        <div className="filtering">
                            <FilterSettings products={this.state.products} filterByPrice={this.filterByPrice}/>
                        </div>
                        <div className="product-result-wrapper">
                        <div className="sort-by">
                                <h1>Dog {this.state.category}</h1>
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
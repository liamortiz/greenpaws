import React, { Component } from 'react';

class FilterSettings extends Component {
    state = {
        brands: [],
        filterPrices: [],
        filterReviews: []
    }
 
    componentDidUpdate(prevProps) {
        if (prevProps.products !== this.props.products) {
            this.setFilterBrands();
            this.setFilterPrices();
            this.setFilterReviews();
        }
    }
    setFilterBrands() {
        const brands = {};
        const brandNames = this.props.products.map(product => product.props.product.brand);
        brandNames.forEach(brand => (brands[brand] !== undefined ? brands[brand]++ : brands[brand]=1 ))
        this.setBrandInputs(brands);
    }
    setBrandInputs(brands) {
        const brandInputs=[];
        for(const value in brands) {
            brandInputs.push(<span onClick={this.props.filterByBrand} key={value}><input type="checkbox" name={value} value={value} />{value} ({brands[value]})</span>)
        }
        this.setState({
            brands: brandInputs
        })
    }
    setFilterPrices() {
        const priceGroups={
            '<10': 0,
            '10-25': 0,
            '25-50': 0,
            '50-100': 0
        }
        this.props.products.forEach(productElement => {
            const product = productElement.props.product;
            const productPrice = Math.floor(product.price);

            if (productPrice < 10) priceGroups['<10']++
            if (productPrice >= 10 && productPrice < 25) priceGroups['10-25']++
            if (productPrice >= 25 && productPrice < 50) priceGroups['25-50']++
            if (productPrice >= 50 && productPrice <= 100) priceGroups['50-100']++
        })
        const filterPrices = [
            <span key={0}><input onClick={this.props.filterByPrice} type="checkbox" value='<10' />Less Than $10 ({priceGroups['<10']})</span>,
            <span key={1}><input onClick={this.props.filterByPrice} type="checkbox" value='10-25' />$10 to $25 ({priceGroups['10-25']})</span>,
            <span key={2}><input onClick={this.props.filterByPrice} type="checkbox" value='25-50' />$25 to $50 ({priceGroups['25-50']})</span>,
            <span key={3}><input onClick={this.props.filterByPrice} type="checkbox" value='50-100' />$50 to $100 ({priceGroups['50-100']})</span>
        ]
        this.setState({
            filterPrices
        })
    }
    setFilterReviews() {
        const ratings = this.props.products.map(product => product.props.product.average_rating);
        const ratingElements = [];
        for (let i = 1; i <= 5; i++) {
            const quantity = ratings.filter(rating => Math.max(1, rating)===i).length
            if (quantity > 0) {
                const button = <button onClick={this.props.filterByRating} name={i} key={i}>
                    <span className={(i>=1) ? "star star-full" : "star"}></span>
                    <span className={(i>=2) ? "star star-full" : "star"}></span>
                    <span className={(i>=3) ? "star star-full" : "star"}></span>
                    <span className={(i>=4) ? "star star-full" : "star"}></span>
                    <span className={(i>=5) ? "star star-full" : "star"}></span>({quantity})
                </button>
                ratingElements.push(button)
            }
            
        }
        this.setState({ 
            filterReviews: ratingElements
        })
    }
    render() {
        return (
            <>
                <div className="filter filter-price">
                    <h2>Price</h2>
                    <form id="filter-price-form">
                        {this.state.filterPrices}
                    </form>
                </div>
                <div className="filter filter-brand">
                    <h2>Brands</h2>
                    <form className="brand-names" id="filter-brand-form">
                        {this.state.brands}
                    </form>
                </div>
                <div className="filter filter-reviews">
                    <h2>Average Rating</h2>
                    {this.state.filterReviews}
                </div>
            </>
        )
    }
}
export default FilterSettings;
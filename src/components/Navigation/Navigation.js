import React, { Component } from 'react';
import ShopDropdown from './ShopDropdown';
import BrandsDropdown from './BrandsDropdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        }

        this.shopElement = React.createRef();
        this.brandsElement = React.createRef();
    }
    showDropDown = (e) => {
        const targetName = e.target.getAttribute('name');
        if (targetName === 'shop') {
            this.shopElement.current.style='max-height: 1000px';
            this.brandsElement.current.style='max-height: 0';

        } else if (targetName === 'brands') {
            this.brandsElement.current.style='max-height: 1000px';
            this.shopElement.current.style='max-height: 0';
        }
    }
    hideDropDown = () => {
        this.brandsElement.current.style='max-height: 0';
        this.shopElement.current.style='max-height: 0';
    }
    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <>
            <nav>
                <Link to="/">
                    <h1 className="logo">greenpaws<i className="icon paws"></i>
                    </h1>
                </Link>
    
                <ul className="nav-items basic" onMouseLeave={this.hideDropDown}>
                    <li 
                    name="shop"
                    onMouseEnter={this.showDropDown}
                    className="expandable">
                        <Link to="/products">Shop</Link>
                        <div ref={this.shopElement} className="dropdown shop-dropdown">
                            <ShopDropdown />
                        </div>
                    </li>
    
                    <li 
                    name="brands"
                    onMouseEnter={this.showDropDown}
                    className="expandable">
                        <Link to="/brands">Brands</Link>
                        <div ref={this.brandsElement} className="dropdown brands-dropdown">
                            <BrandsDropdown />
                        </div>
                    </li>
    
                    <li>On Sale</li>
                </ul>
    
                <form className="search-bar">
                    <div className="search-wrapper">
                        <input type="text" placeholder="Search Our Store" value={this.state.query} onChange={this.handleChange}/>
                        <button type="submit"><i className= "icon search"></i></button>
                    </div>
                </form>
    
                <div className="nav-items right-side">
                    <Link to="/register">
                        <div className="small-container account-container">
                            <i className="icon account"></i>
                            <p>Account</p>
                        </div>
                    </Link>
                    <Link to="/cart">
                        <div className="small-container cart-container">
                            <i className="icon cart"></i>
                            <p>Cart</p>
                            <span id="products-in-cart"><p> {this.props.productsInCart} </p></span>
                        </div>
                    </Link>
                </div>
            </nav>
             <div className="discount-bar">FREE 1-3 DAY SHIPPING OVER $30!</div>
             </>
        )
    }
}

const mstp = state => {
    return {productsInCart: state.users.user.productsInCart.length}
}

export default connect(mstp, null)(Navigation);
import React from 'react';

const Navigation = props => {
    return (
        <nav>
            <h1 className = "logo">greenpaws <i className = "icon paws"></i></h1>
            <ul className = "nav-items basic">
                <li className = "expandable">Shop</li>
                <li className = "expandable">Brands</li>
                <li>On Sale</li>
            </ul>
            <form className="search-bar">
                <div className="search-wrapper">
                    <input type = "text" placeholder="Search our products"/>
                    <button type = "submit"><i className= "icon search"></i></button>
                </div>
            </form>
            <div className="nav-items right-side">
                <i className="icon account"></i>
            </div>
        </nav>
    )
}
export default Navigation;
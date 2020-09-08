import React from 'react';
import { Link  } from 'react-router-dom';

const BrandContainer = () => {
    return (
        <div className = "wrapper brand-wrapper">
            <h1>Shop by Brand</h1>
            <div className="brands">
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Rubit</h2></div></Link>
                <Link to='/products/brands/SunSeed'><div className="brand"><h2>Sun Seed</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Petmate</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Plexidor</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Shed-X</h2></div></Link>

                <Link to='/products/brands/Rubit'><div className="brand"><h2>UNLEASHED</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Doggles</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Galapagos</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Charlotte's Web</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>ZuPreem</h2></div></Link>

                <Link to='/products/brands/Rubit'><div className="brand"><h2>Felimazole</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>ScoopAway</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>NutraFin</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Previcox</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Tetra</h2></div></Link>

                <Link to='/products/brands/Rubit'><div className="brand"><h2>Pet Safe</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Wild Delight</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Macs</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Fieldcrest Farms</h2></div></Link>
                <Link to='/products/brands/Rubit'><div className="brand"><h2>Tumbo</h2></div></Link>
            </div>
        </div>
    )
}
export default BrandContainer;
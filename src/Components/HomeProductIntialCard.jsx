
import React, { useEffect, useState } from 'react';
import '../CSS/ProductDefault.css';
import TestAtom from '../Recoils/TestAtom';
import { useRecoilState } from 'recoil';
import DetailsProductAtom from '../Recoils/DetailsProductAtom'; 
import { useNavigate } from 'react-router-dom';
const HomeProductIntialCard = () => {
    //const [products, setProducts] = useState([]);
    const [products, setProducts] = useRecoilState(TestAtom);
    const [loading, setLoading] = useState(true);
    const [detailsProduct, setDetailsProduct] = useRecoilState(DetailsProductAtom);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/Mizanur/get_products_default_50/') // Update URL as per your Django endpoint
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch products");
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loader">Loading products...</div>;
    }

    return (
        <div>
            <h2 className='product-title'>Here's Your Best Picks</h2>
            <div className="product-container">
                {products.map(product => (
                    <div className="product-card" key={product.id} onClick={() => {
                        setDetailsProduct(product);
                        navigate('/product-details');
                    }}>
                        <img src={"http://127.0.0.1:8000/" + product.image} alt={product.title} className="product-image" />
                        <div className="product-info">
                         <h5 className='product-desc'>{product.desc}</h5>
                            {/* <p className='product-desc'>{product.category}</p> */}
                            <p className='product-desc'>₹{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomeProductIntialCard
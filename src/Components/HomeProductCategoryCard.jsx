import React, { useEffect, useState } from 'react';
import '../CSS/ProductDefault.css';
import { useRecoilState } from 'recoil';
import ProductCategoryUserAtom from '../Recoils/ProductCategoryUserAtom';
import { useNavigate } from 'react-router-dom';
const HomeProductCategoryCard = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useRecoilState(ProductCategoryUserAtom);
    const navigate = useNavigate();




    useEffect(() => {
        if (categoryName === "") {
            // alert("Please select a category first.");
            navigate('/');
        }
        fetch('http://127.0.0.1:8000/Mizanur/get_products_by_category/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryName),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error while getting category data:", error);
            });
    }, []);

    if (loading) {
        return <div className="loader">Loading products...</div>;
    }
    return (
        <div>
           
            <div className="product-container">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
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

export default HomeProductCategoryCard
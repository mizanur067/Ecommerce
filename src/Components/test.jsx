import React from 'react'
import '../CSS/AllCategories.css';

const categories = [
    { name: 'Electronics', image: '../../Image/Electronics.jpg' },
    { name: 'Clothing', image: '../../Image/Clothing.jpeg' },
    { name: 'Books', image: '../../Image/Books.webp' },
    { name: 'Home Appliances', image: '../../Image/Home_Appliances.webp' },
    { name: 'Beauty', image: '../../Image/Beauty.jpeg' },
    { name: 'Toys', image: '../../Image/Toys.jpeg' },
];
const AllCategoriesComponent = () => {
    return (
        <div className="category-container">
            <h2>Shop by Category</h2>
            <div className="category-grid">
                {categories.map((cat) => (
                    <div key={cat.name} className="category-card">
                        <div className="image-wrapper">
                            <img src={cat.image} alt={cat.name} />
                        </div>
                        <div className="category-name">{cat.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllCategoriesComponent

//4
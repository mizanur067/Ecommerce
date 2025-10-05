import React, { use, useRef } from 'react';
import '../CSS/AllCategories.css';
import ProductCategoryUserAtom from '../Recoils/ProductCategoryUserAtom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const categories = [
  { name: 'Electronics', image: '../../Image/Electronics.jpg' },
  { name: 'Clothing', image: '../../Image/Clothing.jpeg' },
  { name: 'Books', image: '../../Image/Books.webp' },
  { name: 'Home Appliances', image: '../../Image/Home_Appliances.webp' },
  { name: 'Beauty', image: '../../Image/Beauty.jpeg' },
  { name: 'Toys', image: '../../Image/Toys.jpeg' },
];

const AllCategoriesComponent = () => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useRecoilState(ProductCategoryUserAtom);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent vertical scroll
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Drag speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };
  const CategoryHandler = (e) => {
    const categoryName = e.target.alt;
    console.log("Selected Category:", categoryName);
    const CategoryData = { 'category': categoryName };
    setCategoryName(CategoryData);
    navigate('/home-category');

  };
  return (
    <div className="category-container">
      <h2>Shop by Category</h2>
      <div
        className="category-row"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {categories.map((cat) => (
          <div key={cat.name} className="category-card">
            <div className="image-wrapper" onClick={CategoryHandler}>
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategoriesComponent;

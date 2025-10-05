import React from 'react'
import '../CSS/ProductUpload.css'
import { useState } from 'react';
const UploadProductCard = () => {

    const [product, setProduct] = useState({
        seller_email: 'rohan@gmail.com',
        title: '',
        price: '',
        desc: '',
        category: '',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setProduct((prev) => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setProduct((prev) => ({ ...prev, [name]: value }));
        }
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, category, image, seller_email, desc } = product;

    if (!title || !price || !category || !image || !seller_email ) {
        alert("Please fill all fields and upload an image.");
        return;
    }

    const formData = new FormData();
    formData.append('seller_email', seller_email);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('desc', desc);
    formData.append('category', category);
    formData.append('image', image);

    try {
        const response = await fetch('http://127.0.0.1:8000/Mizanur/upload_product/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        console.log('Product uploaded successfully:', data);
        alert("Product uploaded successfully!");
        setSubmitted(true);
    } catch (error) {
        console.error('Error:', error);
    }
};


    return (
        <div className="upload-container">
            <form className="upload-form" onSubmit={handleSubmit}>
                <h2>Upload Product</h2>

                <label>
                    Product Name
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        placeholder="Product name"
                        required
                    />
                </label>

                <label>
                    Price (₹)
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="e.g. 499"
                        required
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="desc"
                        value={product.desc}
                        onChange={handleChange}
                        placeholder="Write product details..."
                        rows={4}

                    ></textarea>
                </label>

                <label>
                    Category
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Category --</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Books">Books</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Beauty">Beauty</option>
                        <option value="Toys">Toys</option>
                    </select>
                </label>


                <label>
                    Product Image
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </label>

                {preview && (
                    <div className="image-preview">
                        <p>Image Preview:</p>
                        <img src={preview} alt="Preview" />
                    </div>
                )}

                <button type="submit">Upload Product</button>

                {submitted && (
                    <p className="success-msg">✅ Product uploaded successfully!</p>
                )}
            </form>
        </div>
    )
}

export default UploadProductCard
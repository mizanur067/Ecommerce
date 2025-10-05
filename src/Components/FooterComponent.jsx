import React from 'react'
import '../CSS/FooterComponent.css'
const FooterComponent = () => {
    return (
        <div>
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-section brand">
                        <h2>MyWebsite</h2>
                        <p>© {new Date().getFullYear()} All rights reserved</p>
                    </div>

                    <div className="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section social">
                        <h3>Follow Us</h3>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📘</a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🐦</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸</a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">💼</a>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    )
}

export default FooterComponent
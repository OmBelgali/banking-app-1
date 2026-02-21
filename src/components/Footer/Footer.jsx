import React from 'react';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {year} Kodbank. All rights reserved by <span>Om Belgali</span></p>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Social media icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white py-4">
            <div className="container-xl">
                {/* Social Media Section */}
                <div className="row justify-content-center text-center">
                    <div className="col-md-12">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
                            <a href="https://facebook.com" className="text-white me-3"><FaFacebook size={30} /></a>
                            <a href="https://twitter.com" className="text-white me-3"><FaTwitter size={30} /></a>
                            <a href="https://instagram.com" className="text-white me-3"><FaInstagram size={30} /></a>
                            <a href="https://linkedin.com" className="text-white"><FaLinkedin size={30} /></a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Section */}
                <div className="row justify-content-center">
                    <div className="col-12 text-center mt-4">
                        <p>&copy; {new Date().getFullYear()} LibGen. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

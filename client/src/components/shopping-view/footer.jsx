import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">ShopByte</h2>
          <p>Your go-to store for trendy fashion, accessories, and more.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li><a href='/shop/listing?category=men' className="hover:underline">Men</a></li>
            <li><a href="/shop/listing?category=women" className="hover:underline">Women</a></li>
            <li><a href="/shop/listing?category=kids" className="hover:underline">Kids</a></li>
            <li><a href="/shop/listing?category=accessories" className="hover:underline">Accessories</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="/shop/checkout" className="hover:underline">Shipping & Returns</a></li>
            <li><a href="/shop/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400"><FaFacebookF/></a>
            <a href="#" className="hover:text-blue-300"><FaTwitter/> </a>
            <a href="#" className="hover:text-pink-400"><FaInstagram/> </a>
            <a href="#" className="hover:text-blue-500"><FaLinkedinIn/></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ShopByte. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

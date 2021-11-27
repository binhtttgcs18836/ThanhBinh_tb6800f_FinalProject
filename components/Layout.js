import React from 'react';
import Navbar from './Navbar';
import Notification from './Notification';
import Footer from './Footer';
import Modal from './Modal';

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Notification />
        <Modal />
        {children}
      </div>

      <Footer />
    </div>
  );
}

export default Layout;

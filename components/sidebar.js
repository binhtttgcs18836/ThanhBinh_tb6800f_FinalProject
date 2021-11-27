import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';

function sidebar() {
  const isActive = (r) => {
    if (r === router.pathname) {
      return ' active';
    } else {
      return '';
    }
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/user">
          <a className="dropdown-item">Users</a>
        </Link>
        <Link href="/categories">
          <a className="dropdown-item">Category</a>
        </Link>
        <Link href="/">
          <a className="dropdown-item"></a>
        </Link>
      </>
    );
  };

  return (
    <div className="manager_page">
      <div className="md-1">
        <br />
        <br />
        <br />
        <div className="sidebar">
          <ul>
            <li>
              <Link href="/users">
                <a>
                  <i className="fas fa-users"></i> Users
                </a>
              </Link>
            </li>

            <li>
              <Link href="/categories">
                <a>
                  <i className="fas fa-clipboard-list"></i> Category
                </a>
              </Link>
            </li>

            <li>
              <Link href="/create">
                <a>
                  <i className="fab fa-product-hunt"></i> Product
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default sidebar;

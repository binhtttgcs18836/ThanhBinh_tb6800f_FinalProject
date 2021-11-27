import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '../store/GlobalState';
import Cookie from 'js-cookie';

function Navbar() {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const isActive = (r) => {
    if (r === router.pathname) {
      return ' active';
    } else {
      return '';
    }
  };

  const handleLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFICATION', payload: { success: 'Logged out!' } });
  };

  const adminRouter = () => {
    return (
      <>
        <Link href="/users">
          <a className="dropdown-item">Manager</a>
        </Link>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            src={auth.user.avatar}
            alt={auth.user.avatar}
            style={{
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              transform: 'translateY(-3px)',
              marginRight: '3px',
            }}
          />
          {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="../profileS/profile">
            <a className="dropdown-item">Profile</a>
          </Link>
          {auth.user.role === 'admin' && adminRouter()}
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link href="/">
          <a className="navbar-brand" href="#">
            <img style={{ width: '100px' }} src="/logo.png" alt="not empty" />
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Góc trái  */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav p-1">
            <li className="nav-item">
              <Link href="/cart">
                <a className={'nav-link' + isActive('/cart')}>
                  <i
                    className="fas fa-shopping-cart position-relative"
                    aria-hidden="true"
                  >
                    <span
                      className="position-absolute"
                      style={{
                        padding: '3px 6px',
                        background: '#ed143dc2',
                        borderRadius: '50%',
                        top: '-10px',
                        right: '-10px',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      {cart.length}
                    </span>
                  </i>{' '}
                  Cart
                </a>
              </Link>
            </li>

            {Object.keys(auth).length === 0 ? (
              <li className="nav-item">
                <Link href="/login">
                  <a className={'nav-link' + isActive('/login')}>
                    <i className="far fa-user-circle" aria-hidden="true"></i>{' '}
                    Login
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

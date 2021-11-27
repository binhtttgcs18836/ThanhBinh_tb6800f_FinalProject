import Head from 'next/head';
import Link from 'next/link';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router'; /* Điều hướng */

const Login = () => {
  const initialState = { email: '', password: '' };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter(); /* Điều hướng user */

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFICATION', payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: 'NOTIFICATION',
      payload: { loading: true },
    });
    const res = await postData('auth/login', userData);

    if (res.err)
      return dispatch({ type: 'NOTIFICATION', payload: { error: res.err } });
    dispatch({ type: 'NOTIFICATION', payload: { success: res.msg } });

    dispatch({
      type: 'AUTH',
      payload: {
        token: res.access_token,
        user: res.user,
      },
    });

    Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7,
    });
    localStorage.setItem('firstLogin', true);
  };

  /* Điều hướng User đăng nhập trở về Home */
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/');
  }, [auth]);

  return (
    <div className="Login_Page">
      <Head>
        <title>Login Page</title>
      </Head>

      <div className="info">
        <h3>LOGIN</h3>
        <form
          className="mx-auto my-4"
          style={{ maxWidth: '500px' }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={handleChangeInput}
            />
            <small id="emailHelp" className="form-text text-muted">
              We never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={password}
              onChange={handleChangeInput}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
          <p className="my-2">
            You do not have account?{' '}
            <Link href="/register">
              <a style={{ color: 'crimson' }}>Register Now</a>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

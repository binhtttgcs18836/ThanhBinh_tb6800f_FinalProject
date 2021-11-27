import Head from 'next/head';
import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Link from 'next/link';
import Sidebar from '../components/sidebar';

const users = () => {
  const { state, dispatch } = useContext(DataContext);
  const { users, auth, modal } = state;

  if (!auth.user) return null;

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-9">
          <h3 className="mana">Manager Users</h3>
          <div className="info">
            <div className="table-responsive">
              <table className="table w-100">
                <thead>
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} style={{ cursor: 'pointer' }}>
                      <th>{index + 1}</th>
                      <th>{user._id}</th>
                      <th>
                        <img
                          src={user.avatar}
                          alt={user.avatar}
                          style={{
                            width: '30px',
                            height: '30px',
                            overflow: 'hidden',
                            objectFit: 'cover',
                          }}
                        />
                      </th>
                      <th>{user.name}</th>
                      <th>{user.email}</th>
                      <th>
                        {user.role === 'admin' ? (
                          user.root ? (
                            <p>
                              <i className=" fas text-danger"> Admin</i>
                            </p>
                          ) : (
                            <p>
                              <i className=" fas text-danger"> Admin</i>
                            </p>
                          )
                        ) : (
                          <p><i className=" fas text-success">Cus</i></p>
                        )}
                      </th>
                      <th>
                        <Link
                          href={
                            auth.user.root && auth.user.email !== user.email
                              ? `/edit_user/${user._id}`
                              : '#!'
                          }
                        >
                          <a>
                            <i
                              className="fas fa-edit text-info mr-2"
                              title="Edit"
                            ></i>
                          </a>
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default users;

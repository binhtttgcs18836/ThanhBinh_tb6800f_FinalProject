import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';
import Loading from './Loading';
import Toast from './Toast';

const Notification = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notification } = state;

  return (
    <div className="container">
    <>
      {notification.loading && <Loading />}
      {notification.error && (
        <Toast
          msg={{ msg: notification.error, title: 'Error' }}
          handleShow={() => dispatch({ type: 'NOTIFICATION', payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {notification.success && (
        <Toast
          msg={{ msg: notification.success, title: 'Success' }}
          handleShow={() => dispatch({ type: 'NOTIFICATION', payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
    </div>
  );
};

export default Notification;

import { ACTION } from './Action';

const reducers = (state, action) => {
  switch (action.type) {
    case ACTION.NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case ACTION.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTION.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTION.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case ACTION.ADD_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ACTION.ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTION.ADD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;

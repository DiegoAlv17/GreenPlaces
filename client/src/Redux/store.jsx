import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch {
    return [];
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});


store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

export default store;


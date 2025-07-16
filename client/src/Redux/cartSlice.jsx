import { createSlice } from '@reduxjs/toolkit';

// Función para cargar el carrito desde localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return [];
  }
};

// Función para guardar el carrito en localStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    // Ignorar errores de escritura
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {

    addToCart: (state, action) => {
    const item = state.find(item => item.id === action.payload.id);
    if (item) {
        item.cantidad += 1;
    } else {
        state.push({ ...action.payload, cantidad: 1 });
    }
    saveCartToStorage(state);
    },

    removeFromCart: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload);
      saveCartToStorage(newState);
      return newState;
    },

    incrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) item.cantidad += 1;
      saveCartToStorage(state);
    },

    decrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item && item.cantidad > 1) item.cantidad -= 1;
      saveCartToStorage(state);
    },
    
    clearCart: (state) => {
      localStorage.removeItem('cart');
      return [];
    },

  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

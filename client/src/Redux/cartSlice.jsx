import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {

    addToCart: (state, action) => {
    const item = state.find(item => item.id === action.payload.id);
    if (item) {
        item.cantidad += 1;
    } else {
        state.push({ ...action.payload, cantidad: 1 });
    }
    },

    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },

    incrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) item.cantidad += 1;
    },

    decrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item && item.cantidad > 1) item.cantidad -= 1;
    },
    
    clearCart: () => [],

  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

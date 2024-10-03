import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      const itemIndex = state.findIndex((item) => item.id === action.payload.id);
    
      if (itemIndex >= 0) {
        if (state[itemIndex].quantity > 1) {
          // Reduce the quantity by 1 if more than 1 exists
          state[itemIndex].quantity -= 1;
        } else {
          // If the quantity is 1, remove the item from the cart
          state.splice(itemIndex, 1);
        }
      }
    },
    
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


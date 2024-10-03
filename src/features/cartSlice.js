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
          
          state[itemIndex].quantity -= 1;
        } else {
        
          state.splice(itemIndex, 1);
        }
      }
    },
    
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;


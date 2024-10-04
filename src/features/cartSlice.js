// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: [],
//   reducers: {
//     addToCart(state, action) {
//       state.push(action.payload);
//     },
//     removeFromCart(state, action) {
//       const itemIndex = state.findIndex((item) => item.id === action.payload.id);
    
//       if (itemIndex >= 0) {
//         if (state[itemIndex].quantity > 1) {
          
//           state[itemIndex].quantity -= 1;
//         } else {
        
//           state.splice(itemIndex, 1);
//         }
//       }
//     },
    
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If the item already exists in the cart, increase the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the new item with a quantity of 1
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

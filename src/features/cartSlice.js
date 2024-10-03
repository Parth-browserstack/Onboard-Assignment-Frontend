import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

// const initialCartState = {
//   items: [],
//   total: 0,
//   status: 'idle',
//   error: null,
// };

// // Fetch cart items
// export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
//   const response = await axios.get('https://fake-ecommerce-app-api.onrender.com/cart');
//   return response.data;
// });

// // Other cart operations (add, remove) would also be implemented similarly

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: initialCartState,
//   reducers: {},
//   extraReducers(builder) {
//       builder
//           .addCase(fetchCart.fulfilled, (state, action) => {
//               state.items = action.payload.items;
//               state.total = action.payload.total;
//           });
//   },
// });

// export default cartSlice.reducer;
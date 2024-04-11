import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    selectedProducts: [], 
    productQuantity: 0,
    totalItems: 0,
    totalAmount: 0,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.selectedProducts = [];
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.selectedProducts = [];
            state.productQuantity = 0,
            state.loading = false;
            state.error = null;
        },
        selectProduct: (state, action) => {
            const { id, quantity } = action.payload;
        
            const existingProductIndex = state.selectedProducts.findIndex(item => item.id === id);
        
            if (existingProductIndex !== -1) {
                state.selectedProducts[existingProductIndex].quantity = quantity;
            } else {
                state.selectedProducts.push(action.payload);
            }
        },
        
        
        successOrder: (state) => {
            state.selectedProducts = [];
            state.productQuantity = 0,
            state.totalItems = 0,
            state.totalAmount = 0
        },

        cartTotalItems: (state, action) => {
            state.totalItems = action.payload
        },

        cartTotalAmount: (state, action) => {
            state.totalAmount = action.payload
        }
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut,
    selectProduct,
    successOrder,
    cartTotalItems,
    cartTotalAmount
} = userSlice.actions;

export default userSlice.reducer;

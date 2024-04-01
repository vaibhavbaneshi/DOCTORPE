import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    selectedProducts: [], // Initialize as an empty array
    productQuantity: 0,
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
            const existingProductIndex = state.selectedProducts.findIndex(product => product.id === id);
            if (existingProductIndex !== -1) {
                // Product already exists, update quantity
                state.selectedProducts[existingProductIndex].quantity += quantity;
                productQuantity = quantity
                console.log(productQuantity);
            } else {
                // Product doesn't exist, add it to selectedProducts
                state.selectedProducts.push(action.payload);
            }
        },
        deselectProduct: (state, action) => {
            const { id, quantity } = action.payload;
            const existingProductIndex = state.selectedProducts.findIndex(product => product.id === id);
            if (existingProductIndex !== -1) {
                // Product exists, decrease quantity or remove if quantity becomes zero
                state.selectedProducts[existingProductIndex].quantity -= quantity;
                if (state.selectedProducts[existingProductIndex].quantity <= 0) {
                    state.selectedProducts.splice(existingProductIndex, 1);
                }
            }
        },
        successOrder: (state) => {
            console.log('hi there');
            state.selectedProducts = [];
            state.productQuantity = 0
        }
    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    signOut,
    selectProduct,
    deselectProduct,
    successOrder
} = userSlice.actions;

export default userSlice.reducer;

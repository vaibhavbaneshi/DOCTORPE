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
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        selectProduct: (state, action) => {
            const product = action.payload;
            if (!product?.id && product?.id !== 0) return;

            const quantity = Number(product.quantity) > 0 ? Number(product.quantity) : 1;
            const existingProductIndex = state.selectedProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingProductIndex !== -1) {
                state.selectedProducts[existingProductIndex] = {
                    ...state.selectedProducts[existingProductIndex],
                    ...product,
                    quantity,
                };
            } else {
                state.selectedProducts.push({ ...product, quantity });
            }
        },
        successOrder: (state) => {
            state.selectedProducts = [];
            state.productQuantity = 0;
            state.totalItems = 0;
            state.totalAmount = 0;
        },
        cartTotalItems: (state, action) => {
            state.totalItems = action.payload
        },
        cartTotalAmount: (state, action) => {
            state.totalAmount = action.payload
        },
        updateUserProfile: (state, action) => {
            state.currentUser = action.payload;
        },
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
    cartTotalAmount,
    updateUserProfile,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    productList: [],
    cartItems:[]
};


 const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList=[...action.payload]
        },
        addCartItems: (state, action) => {
            const check = state.cartItems.some(el => el._id === action.payload._id)

            if (check) {
             toast(`${action.payload.name} already in cart!`)
            } else {
                 const total=action.payload.price
                state.cartItems = [...state.cartItems, { ...action.payload, qty: 1, total: total }]
                toast(`${action.payload.name} added to cart`)
            }

           
            
        },
        deleteCartItems: (state, action) => {
            const index = state.cartItems.findIndex(el => el._id === action.payload);
            state.cartItems.splice(index, 1);
            toast(`item removed from`)
        },
        increaseQty: (state, action) => {
            const index = state.cartItems.findIndex(el => el._id === action.payload);
            let qty = state.cartItems[index].qty;
            const qtyInr= ++qty;

            state.cartItems[index].qty =qtyInr

            const price = state.cartItems[index].price
            
            const total = price * qtyInr;

            state.cartItems[index].total = total;

        },
        decreaseQty: (state, action) => {
             const index = state.cartItems.findIndex(el => el._id === action.payload);
            let qty = state.cartItems[index].qty
            if (qty > 1) {
                 const qtyDer= --qty;
                state.cartItems[index].qty = qtyDer
                
                 const price = state.cartItems[index].price
            
            const total = price * qtyDer;

            state.cartItems[index].total = total;
            }
           
        }
    }
});

export const { setDataProduct,addCartItems,deleteCartItems,increaseQty,decreaseQty } = productSlice.actions;

export default productSlice.reducer;
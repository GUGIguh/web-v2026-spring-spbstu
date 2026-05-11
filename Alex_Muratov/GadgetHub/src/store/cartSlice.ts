import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {logout} from "./authSlice";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartState{
    items:Record<number, CartItem>;
}

interface AddItemPayload {
    id: number;
    name: string;
    price: number;
}

const initialState:CartState = {
    items: {}
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<AddItemPayload>) => {
            const { id, name, price } = action.payload;

            if (state.items[id]) {
                state.items[id].quantity += 1;
            } else {
                state.items[id] = {
                    id,
                    name,
                    price,
                    quantity: 1
                };
            }
        },

        removeItem: (state, action) => {
            delete state.items[action.payload];
        },

        increaseQuantity: (state, action) => {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id].quantity += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            if (state.items[id] && state.items[id].quantity > 1) {
                state.items[id].quantity -= 1;
            } else {
                delete state.items[id];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.items = {};
        });
    },
});


export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
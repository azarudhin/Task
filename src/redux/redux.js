
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { data } from "./data";

export const store = configureStore({
    reducer: {},
});

const initialState = data.rows;

export const counterSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;

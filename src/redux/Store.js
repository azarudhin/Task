
import { configureStore } from "@reduxjs/toolkit";
import Redux from "./redux";

export const store = configureStore({
    reducer: {
        counter: Redux,
    },
});

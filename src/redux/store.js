import { configureStore } from "@reduxjs/toolkit";
import { likeReducer } from "./likeRedux/likeSlice";

const store=configureStore({
    reducer:{
        like:likeReducer
    }
});

export default store;
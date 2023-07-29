import { configureStore } from "@reduxjs/toolkit";
import homeslice from "./homeslice";
const store =configureStore({
    reducer:{home:homeslice}
})

export default store;